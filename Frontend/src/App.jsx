import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Portfolio from "./Pages/Portfolio";
import Propertylist from "./Pages/Propertylist";
import Support from "./Pages/Support";
import Setting from "./Pages/Setting";
import Sidebar from "./Components/Sidebar";
import './App.css'; // Add a CSS file for layout

function App() {
  return (
    <div className="app">
      <Router>
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/portfolio' element={<Portfolio />} />
            <Route path='/propertylist' element={<Propertylist />} />
            <Route path='/support' element={<Support />} />
            <Route path='/setting' element={<Setting />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;

