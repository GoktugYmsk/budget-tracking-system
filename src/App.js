
import { Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';
import { Helmet } from 'react-helmet';
import CustomComponent from './components/customComponent';

import './App.css';

function App() {
  return (
    <div className="App">
      <Helmet>
        <title>budget-tracking-system</title>
      </Helmet>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/MainPage" element={<CustomComponent />} />
      </Routes>
    </div>
  );
}

export default App;
