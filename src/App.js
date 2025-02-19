import './css/App.css';
import Navbar from './components/Navbar.js';
import Carrousel from './components/Carrousel.js'
import Catagories from './components/Catagory.js'
import Grid from './components/ItemsHome.js'
import Cart from './components/Cart.js';
import Footer from './components/Footer.js'
import { BrowserRouter, Routes, Route } from 'react-router-dom';





function App() {
  return (
    <>
      <Navbar />


      <Routes>
        <Route path="/cart" element={<Cart />} />
        <Route path="/" element={<><Catagories /> <Carrousel /></>} />
      </Routes>


      <Grid />

      <Footer />
    </>



  );
}

export default App;
