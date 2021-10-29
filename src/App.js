import './App.css';
import Home from './components/Home';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Blog from './components/Blog';
import Navbar from './components/Navbar';
import { 
  BrowserRouter as Router, 
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router> 
      <Navbar/>
      <Switch>
        <Route path="/"><Home/></Route>
        <Route path="/about"><About/></Route>
        <Route path="/portfolio"><Portfolio/></Route>
        <Route path="/blog"><Blog/></Route>
      </Switch>
    </Router>
  );
}

export default App;
