import React, { useState } from 'react';

const Header: React.FC = () => {
  const [activeLink, setActiveLink] = useState('#about');

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  return (
    <header>
      <h1>My Portfolio</h1>
      <nav>
        <ul>
          <li>
            <a 
              href="#about" 
              onClick={() => handleLinkClick('#about')} 
              className={activeLink === '#about' ? 'active' : ''}
            >
              About
            </a>
          </li>
          <li>
            <a 
              href="#projects" 
              onClick={() => handleLinkClick('#projects')} 
              className={activeLink === '#projects' ? 'active' : ''}
            >
              Projects
            </a>
          </li>
          <li>
            <a 
              href="#sequence-diagram" 
              onClick={() => handleLinkClick('#sequence-diagram')} 
              className={activeLink === '#sequence-diagram' ? 'active' : ''}
            >
              Sequence Diagram
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
