import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="about-section">
      <h2>About Me</h2>
      <p>Hello! My name is Philip and I am a Web Developer.</p>
      <p>
        I specialize in creating dynamic and responsive web applications.
        I love learning new technologies and improving my skills.
      </p>
      <p>
        You can check out my work in the <a href="#projects">Projects</a> section!
      </p>
      <img src="path/to/your/image.jpg" alt="Philip" className="about-image" />
    </section>
  );
};

export default About;
