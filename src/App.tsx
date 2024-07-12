import { FC } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'

import NavBar from './components/NavBar/NavBar';
import VinylPlayer from './components/VinylPlayer/VinylPlayer';

interface AppProps {
  title: string;
}

const Home = () => <h2>Home</h2>;
const Projects = () => <h2>Projects</h2>
const About = () => <h2>About Me</h2>
const Blog = () => <h2>Blog</h2>

const App : FC<AppProps> = () => {
  return(
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
        <NavBar />
      </div>
    </Router>
  );
}

export default App
