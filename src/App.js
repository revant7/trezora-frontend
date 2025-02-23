import './css/App.css';
import Navbar from './components/Navbar.js';
import Carrousel from './components/Carrousel.js'
import Catagories from './components/Catagory.js'
import Grid from './components/ItemsHome.js'
import Cart from './components/Cart.js';
import Footer from './components/Footer.js'
import SignIn from './pages/SignIn.js';
import CreateAccount from './pages/CreateAccount.js';
import Orders from './components/Orders.js'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CatagoryPage from './components/CatagoryPage.js';





function App() {
  return (
    <>


      <Routes>
        <Route exact path="/sign-in" element={<><Navbar /> <SignIn /></>}></Route>
        <Route exact path="/create-account" element={<><Navbar /> <CreateAccount /></>}></Route>
        <Route exact path="/cart" element={<><Navbar /> <Cart cartItems={[]} /></>} />
        <Route exact path="/orders" element={<><Navbar /> <Orders orders={[]} /></>} />
        <Route path="/catagory/:categoryName" element={<><Navbar /> <CatagoryPage /></>} />
        <Route exact path="/" element={<><Navbar /> <Catagories /> <Carrousel /> <Grid /></>} />
      </Routes>

      <Footer />
    </>



  );
}

export default App;
