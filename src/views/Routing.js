import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Main from '../pages/Main/Main';
import ScrollToTop from '../components/common/ScrollToTop/ScrollToTop';

const Routing = () => {
    return (
        <Router>
            <ScrollToTop />
            <div>
                <Routes>
                    <Route path="/" element={<Home />} exact />
                    <Route path="/train" element={<Main />} />
                </Routes>
            </div>
        </Router>
    );
};

export default Routing;
