import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();  

  return (
    <footer>
      <p>&copy; {currentYear} My Portfolio</p>
      <nav>
        <ul>
          <li><a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">GitHub</a></li>
          <li><a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          <li><a href="https://yourwebsite.com" target="_blank" rel="noopener noreferrer">Website</a></li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
