// import { FC } from 'react';
// import { Link } from 'react-router-dom';
// import './NavBar.css';

// const NavBar : FC = () => {
//     return (
//         <nav className="navbar">
//             <ul className="navbar-list">
//                 <li className="navbar-item">
//                     <Link to="/">Home</Link>
//                 </li>
//                 <li className="navbar-item">
//                     <Link to="/about">About Me</Link>
//                 </li>                
//                 <li className="navbar-item">
//                     <Link to="/projects">Projects</Link>
//                 </li>
//                 <li className="navbar-item">
//                     <Link to="/blog">Blog</Link>
//                 </li>
//                 <li className="navbar-item">
//                     <a href="https://github.com/seungkilee-cs" target="_blank" rel="noopener noreferrer">Github</a>
//                 </li>
//             </ul>
//         </nav>
//     );
// }

// export default NavBar;

import React from 'react';
import './NavBar.css';

const NavBar: React.FC = () => {
  const tabs = [
    { id: 'home', title: 'Home', icon: '🏠' },
    { id: 'about', title: 'About', icon: 'ℹ️' },
    { id: 'contact', title: 'Contact', icon: '📞' },
  ];

  return (
    <div className="navbar-container">
      {tabs.map(tab => (
        <div key={tab.id} className="tab">
          <div className="icon">{tab.icon}</div>
          <div className="title">{tab.title}</div>
        </div>
      ))}
    </div>
  );
};

export default NavBar;