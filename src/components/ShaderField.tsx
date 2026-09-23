import { useEffect, useRef } from 'react';
import type { SectionId } from '../hooks/useActiveSection';
import styles from './ShaderField.module.css';

/* Scene = which section owns the viewport; the field re-grades per scene. */
const SCENE_INDEX: Record<SectionId, number> = {
  hero: 0,
  about: 1,
  projects: 2,
  contact: 3,
};

const VERT = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_mouseAmt;
uniform float u_scene;
uniform float u_pulse;
uniform float u_light;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * vnoise(p);
    p = p * 2.03 + vec2(17.3, 9.1);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  float aspect = u_res.x / max(u_res.y, 1.0);
  vec2 p = vec2(uv.x * aspect, uv.y);

  /* scene grades: home (liquid, ember biased right) -> profile (calm)
     -> work (denser mesh) -> contact (ember at full) */
  float s01 = clamp(u_scene, 0.0, 1.0);
  float s12 = clamp(u_scene - 1.0, 0.0, 1.0);
  float s23 = clamp(u_scene - 2.0, 0.0, 1.0);

  float scale = 2.1;
  scale = mix(scale, 1.5, s01);
  scale = mix(scale, 3.1, s12);
  scale = mix(scale, 2.3, s23);

  float speed = 0.055;
  speed = mix(speed, 0.028, s01);
  speed = mix(speed, 0.07, s12);
  speed = mix(speed, 0.05, s23);

  float warmBias = 0.35;
  warmBias = mix(warmBias, 0.12, s01);
  warmBias = mix(warmBias, 0.22, s12);
  warmBias = mix(warmBias, 0.9, s23);

  float rightBias = (1.0 - s01) * smoothstep(0.4, 1.0, uv.x) * 0.35;

  /* cursor displaces the field (the signature) */
  vec2 m = vec2(u_mouse.x * aspect, u_mouse.y);
  vec2 d = p - m;
  float dist = max(length(d), 0.0001);
  float infl = exp(-dist * dist * 20.0) * u_mouseAmt;

  vec2 q = p * scale + vec2(u_time * speed, u_time * speed * 0.62);
  q += (d / dist) * infl * 0.5;

  float warp = fbm(q * 0.9 + u_time * 0.02);
  float n = fbm(q + warp * 1.2);
  float ridge = sin((p.y * 2.6 + n * 2.3 - u_time * speed * 2.4) * 3.14159);
  float field = n * 0.95 + ridge * 0.15 - 0.1;
  field += u_pulse * 0.3 * sin(n * 9.0 + u_time * 2.0);
  field = clamp(field, 0.0, 1.0);

  vec3 BG_D = vec3(0.024, 0.09, 0.11);
  vec3 MID_D = vec3(0.055, 0.231, 0.267);
  vec3 EMB = vec3(1.0, 0.416, 0.239);
  vec3 BG_L = vec3(0.957, 0.933, 0.89);
  vec3 MID_L = vec3(0.024, 0.09, 0.11);

  vec3 bg = mix(BG_D, BG_L, u_light);
  vec3 mid = mix(MID_D, MID_L, u_light);

  float warm = smoothstep(0.6, 0.96, field + warmBias * 0.4 + rightBias + infl * 0.45 + u_pulse * 0.25);
  float cool = smoothstep(0.2, 0.75, field);

  /* particle mesh: the field reads as points, not gradient chrome */
  vec2 gc = gl_FragCoord.xy / 2.5;
  float dgrid = length(fract(gc) - 0.5);
  float dots = 1.0 - smoothstep(0.12, 0.42, dgrid);
  float mesh = mix(1.0, dots, 0.75);

  vec3 fieldCol = mix(mid, EMB, warm);
  float amt = cool * mix(0.9, 0.62, u_light);

  vec3 col = mix(bg, fieldCol, amt * mesh);
  col += EMB * warm * 0.1 * mix(1.0, 0.6, u_light);

  float grain = hash(gl_FragCoord.xy + vec2(fract(u_time) * 61.7)) - 0.5;
  col += grain * 0.032;

  float vig = smoothstep(1.3, 0.3, length(uv - vec2(0.5)) * 1.35);
  col = mix(mix(bg, col, 0.6), col, vig);

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string): WebGLShader | null {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.warn('Portal shader compile failed:', gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

interface Props {
  scene: SectionId;
}

export default function ShaderField({ scene }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneTarget = useRef(SCENE_INDEX[scene]);
  const drawRef = useRef<(() => void) | null>(null);

  sceneTarget.current = SCENE_INDEX[scene];

  /* Static frame under reduced motion: no loop, redraw on scene/theme change. */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      drawRef.current?.();
    }
  }, [scene]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', {
      antialias: false,
      alpha: false,
      powerPreference: 'high-performance',
    });
    if (!gl) return; /* no WebGL: the page keeps its flat token ground */

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.warn('Portal program link failed:', gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const U = {
      res: gl.getUniformLocation(prog, 'u_res'),
      time: gl.getUniformLocation(prog, 'u_time'),
      mouse: gl.getUniformLocation(prog, 'u_mouse'),
      mouseAmt: gl.getUniformLocation(prog, 'u_mouseAmt'),
      scene: gl.getUniformLocation(prog, 'u_scene'),
      pulse: gl.getUniformLocation(prog, 'u_pulse'),
      light: gl.getUniformLocation(prog, 'u_light'),
    };

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const readDark = () => {
      const v = document.documentElement.getAttribute('data-theme');
      return v ? v === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    };

    let lightTarget = readDark() ? 0 : 1;
    let lightCur = lightTarget;
    let sceneCur = sceneTarget.current;
    let mouseTX = 0.5;
    let mouseTY = 0.5;
    let mouseX = 0.5;
    let mouseY = 0.5;
    let mouseAmt = 0;
    let lastMove = 0;
    let pulse = 0;
    const startT = performance.now();
    let prevT = startT;
    let raf = 0;

    const resize = () => {
      const w = Math.max(canvas.clientWidth, 1);
      const h = Math.max(canvas.clientHeight, 1);
      const d = Math.min(window.devicePixelRatio || 1, 1.75);
      const pw = Math.round(w * d);
      const ph = Math.round(h * d);
      if (canvas.width !== pw || canvas.height !== ph) {
        canvas.width = pw;
        canvas.height = ph;
        gl.viewport(0, 0, pw, ph);
      }
    };

    const draw = (time: number, sceneV: number, lightV: number, pulseV: number) => {
      gl.uniform2f(U.res, canvas.width, canvas.height);
      gl.uniform1f(U.time, time);
      gl.uniform2f(U.mouse, mouseX, mouseY);
      gl.uniform1f(U.mouseAmt, mouseAmt);
      gl.uniform1f(U.scene, sceneV);
      gl.uniform1f(U.pulse, pulseV);
      gl.uniform1f(U.light, lightV);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    drawRef.current = () => {
      resize();
      draw(7.3, sceneTarget.current, lightTarget, 0);
    };

    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min((t - prevT) / 1000, 0.1);
      prevT = t;
      resize();

      sceneCur += (sceneTarget.current - sceneCur) * (1 - Math.exp(-dt * 2.6));
      lightCur += (lightTarget - lightCur) * (1 - Math.exp(-dt * 7));
      mouseX += (mouseTX - mouseX) * (1 - Math.exp(-dt * 9));
      mouseY += (mouseTY - mouseY) * (1 - Math.exp(-dt * 9));

      const idle = lastMove > 0 && performance.now() - lastMove > 2600;
      const amtTarget = lastMove > 0 && !idle ? 1 : 0;
      mouseAmt += (amtTarget - mouseAmt) * (1 - Math.exp(-dt * 4));
      pulse *= Math.exp(-dt * 3.2);

      draw((t - startT) / 1000, sceneCur, lightCur, pulse);
    };

    const onMove = (e: PointerEvent) => {
      mouseTX = e.clientX / Math.max(window.innerWidth, 1);
      mouseTY = 1 - e.clientY / Math.max(window.innerHeight, 1);
      lastMove = performance.now();
    };
    const onDissolve = () => {
      pulse = 1;
    };
    const onContextLost = (e: Event) => e.preventDefault();

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('portal:dissolve', onDissolve);
    canvas.addEventListener('webglcontextlost', onContextLost);

    const mo = new MutationObserver(() => {
      lightTarget = readDark() ? 0 : 1;
      if (reduced) drawRef.current?.();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    const onVis = () => {
      if (reduced) return;
      if (document.hidden) {
        if (raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      } else if (!raf) {
        prevT = performance.now();
        raf = requestAnimationFrame(loop);
      }
    };
    document.addEventListener('visibilitychange', onVis);

    resize();
    if (reduced) {
      draw(7.3, sceneTarget.current, lightTarget, 0);
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      drawRef.current = null;
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('portal:dissolve', onDissolve);
      canvas.removeEventListener('webglcontextlost', onContextLost);
      document.removeEventListener('visibilitychange', onVis);
      mo.disconnect();
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.field} aria-hidden="true" />;
}
