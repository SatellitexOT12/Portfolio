# React Portfolio Website

A modern, responsive portfolio website built with **React**, **TypeScript**, and **Vite**. This project showcases a complete portfolio solution with smooth navigation, project showcase, about section, and contact information.

## 🚀 Features

- **Navigation Bar**: Sticky navigation with smooth scrolling and mobile-responsive menu
- **Hero Section**: Eye-catching landing section with call-to-action
- **About Section**: Personal introduction with skills showcase
- **Projects Showcase**: Grid-based project cards with technologies and descriptions
- **Footer**: Contact section with social media links
- **Responsive Design**: Fully mobile-friendly layout
- **Modern Styling**: CSS modules with gradient backgrounds and smooth transitions
- **TypeScript Support**: Full type safety throughout the project

## 📋 Project Structure

```
src/
├── components/
│   ├── Navigation.tsx        # Navigation bar with smooth scroll
│   ├── Navigation.module.css
│   ├── Hero.tsx             # Hero/landing section
│   ├── Hero.module.css
│   ├── About.tsx            # About section with skills
│   ├── About.module.css
│   ├── Projects.tsx         # Projects showcase grid
│   ├── Projects.module.css
│   ├── Footer.tsx           # Footer with contact links
│   └── Footer.module.css
├── App.tsx                  # Main app component
├── App.css                  # Global styles
├── main.tsx                 # Entry point
└── vite-env.d.ts           # Vite type definitions
```

## 🛠️ Installation & Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:5173`

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Preview production build**:
   ```bash
   npm run preview
   ```

## 🎨 Customization

### Update Personal Information

1. **Hero Section** - Edit `src/components/Hero.tsx`:
   - Change the title, subtitle, and call-to-action text

2. **About Section** - Edit `src/components/About.tsx`:
   - Update the biography text
   - Modify the skills list by editing the skills array

3. **Projects** - Edit `src/components/Projects.tsx`:
   - Update the `projectsData` array with your own projects
   - Add project titles, descriptions, technologies, and links

4. **Footer** - Edit `src/components/Footer.tsx`:
   - Update social media links (GitHub, LinkedIn)
   - Change the contact email

### Styling

- **Colors**: The site uses a purple gradient (#667eea to #764ba2). Update these in component CSS files to customize colors.
- **CSS Modules**: Each component has its own CSS module for isolated styling.
- **Global Styles**: `src/App.css` contains global styles and resets.

## 📱 Responsive Design

The portfolio is fully responsive and adapts to:
- Mobile phones (< 768px)
- Tablets (768px - 1024px)
- Desktop screens (> 1024px)

## 🚀 Deployment

The site can be easily deployed to:
- **Vercel**: Connect your GitHub repo for automatic deployments
- **Netlify**: Drag and drop the `dist` folder or connect GitHub
- **GitHub Pages**: Run `npm run build` and push the `dist` folder
- **Any static hosting**: Upload the contents of the `dist` folder

## 🔧 Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 📚 Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Modern build tool
- **CSS Modules** - Component-scoped styling
- **HTML5** - Semantic markup

## 📝 Notes

- The projects data is currently using placeholder information. Replace with your actual projects.
- Social media links in the footer should be updated with your actual profiles.
- Consider adding a form library (like Formik or React Hook Form) if you want to add a contact form.

## 📄 License

This project is open source and available under the MIT License.
