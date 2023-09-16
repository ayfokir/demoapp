
import './App.css';
import Home from './Pages/Home';
import AddEmployee from './Pages/AddEmployee';
import Login from './Pages/Login';
import {Routes, Route} from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-employee" element={<AddEmployee />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
} 


export default App;
