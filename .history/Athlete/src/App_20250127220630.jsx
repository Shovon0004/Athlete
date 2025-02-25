import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SideNavbar from './components/SideNavbar';
import EditableFinanceDashboard from './components/EditableFinanceDashboard';
import HeroPage from './components/HeroPage';
import Injury1 from './components/Injury1';

const App = () => {
  return (
    <Router>
      <div className="flex">
        <SideNavbar />
        
        <div className="ml-20 flex-grow ">
          <Routes>
            <Route path="/" element={<HeroPage />} />
            <Route path="/financial" element={<EditableFinanceDashboard />} />
            <Route path="/injuries" element={<Injury1/>} />
            {/* Add other routes as needed */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
