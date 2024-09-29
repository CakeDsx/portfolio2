// src/App.tsx
import React from 'react';
import About from './components/About';
import SequenceDiagram from './components/SequenceDiagram';

const App: React.FC = () => {
    return (
        <>
            <About />
            <SequenceDiagram />
        </>
    );
};

export default App;
