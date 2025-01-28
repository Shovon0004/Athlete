import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SideNavbar from './components/SideNavbar';
import EditableFinanceDashboard from './components/EditableFinanceDashboard';
i

const App = () => {
  return (
    <Router>
      <div className="flex">
        <SideNavbar />
        <HeroPage />
        <div className="ml-20 flex-grow p-4">
          <Routes>
            <Route path="/financial" element={<EditableFinanceDashboard />} />
            {/* Add other routes as needed */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
