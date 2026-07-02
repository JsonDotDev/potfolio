import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProjectDetailPage from './pages/ProjectDetailPage';

type ThemeMode = 'dark' | 'light';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView();
        } else {
          window.scrollTo(0, 0);
        }
      });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

function App() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      return savedTheme;
    }

    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header theme={theme} onToggleTheme={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;