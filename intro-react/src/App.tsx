import React from 'react';
import Header from './components/Header';
import About from './components/About';
import AddProject from './components/AddProject';
import Projects from './components/Projects';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div id="app">
      <Header />
      <About />
      <AddProject />
      <Projects />
      <Footer />
    </div>
  );
};

export default App;
