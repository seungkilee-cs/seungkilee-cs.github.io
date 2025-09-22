import { Routes, Route } from "react-router-dom";
import { Nav } from "./components/Nav/Nav";
import { About } from "./pages/About/About";
import { Projects } from "./pages/Projects/Projects";
import { Contact } from "./pages/Contact/Contact";
import styles from "./App.module.css";

export default function App() {
  return (
    <div className={styles.appShell}>
      <Nav />
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  );
}
