import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Customer from "./Components/Customer";
import Product from "./Components/Product";
import Store from "./Components/Store";
import Sale from "./Components/Sale";


function App() {
  return (
     <>
    <Navbar/>
   
        <div>
        <Routes>
           <Route exact path="/" element={<Customer />} />
           <Route exact path="/Product" element={<Product />} />
           <Route exact path="/Store" element={<Store />} />
           <Route exact path="/Sale" element={<Sale />} />
        </Routes>
        </div>
   
    </>
  );
}

export default App;
