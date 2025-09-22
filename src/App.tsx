import { Routes, Route } from "react-router-dom";
import { Nav } from "./components/Nav/Nav";
import { About } from "./pages/About/About";
import { Projects } from "./pages/Projects/Projects";
import { Contact } from "./pages/Contact/Contact";
import { Blog } from "./pages/Blog/Blog";
import { BlogPost } from "./pages/BlogPost/BlogPost";
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary";
import styles from "./App.module.css";

export default function App() {
  return (
    <div className={styles.appShell}>
      <Nav />
      <main className={styles.main}>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
          </Routes>
        </ErrorBoundary>
      </main>
    </div>
  );
}
