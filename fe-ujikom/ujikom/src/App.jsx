import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Customer from './pages/Customer/Customer';
import Sales from './pages/Sales/Sales';
import Item from './pages/Item/Item';
import Transaction from './pages/Transaction/Transaction';
import Petugas from './pages/Petugas/Petugas';
import Login from './pages/Login/login';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<Customer />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/item" element={<Item />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/petugas" element={<Petugas />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;