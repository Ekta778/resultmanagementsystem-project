import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Students from './components/Students';
import Subjects from './components/Subjects';
import Results from './components/Results';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/results" element={<Results />} />
          <Route path="/reports" element={<div className="text-center text-gray-500 py-12">Reports coming soon...</div>} />
          <Route path="/settings" element={<div className="text-center text-gray-500 py-12">Settings coming soon...</div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;