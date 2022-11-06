import React, { useState } from 'react';
import './App.scss';
import Home from './components/Home/Home';
import Content from './components/Content/Content';

function App() {
    const [started, setStarted] = useState(false);
    console.log(started);
    return (
        <div className="App">
            {!started ? <Home started={started} setStarted={setStarted} /> : <Content />}
        </div>
    );
}

export default App;
