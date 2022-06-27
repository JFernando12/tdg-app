import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Client from './pages/Clients';
import Orders from './pages/Orders';
import AddClient from './pages/AddClient';
import Origins from './pages/Origins';
import Navbar from "./components/Navbar";
import Products from './pages/Products';
import AddOrder from './pages/AddOrder';
import Order from './pages/Order';
import Payments from './pages/Payments';
import Shipments from './pages/Shipments';
import AddShipment from './pages/AddShipment';
import AddPersonalization from './pages/AddPersonalization';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path='/clients' element={<Client/>} />
          <Route path='/orders' element={<Orders/>} />
          <Route path='/orders/:order_id' element={<Order/>} />
          <Route path='/payments/:order_id' element={<Payments/>} />
          <Route path='/shipments/:order_id' element={<Shipments/>} />
          <Route path='/clients/add/:client_origin' element={<AddClient/>} />
          <Route path='/clients/origins' element={<Origins></Origins>} />
          <Route path='/products/:client_id' element={<Products></Products>} />
          <Route path='/shipments/add/:order_id' element={<AddShipment></AddShipment>} />
          <Route path='/orders/add/:client_id/:product_id' element={<AddOrder></AddOrder>} />
          <Route path='/personalization/:order_id' element={<AddPersonalization/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
