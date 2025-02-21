import './css/App.css';
import Navbar from './components/Navbar.js';
import Carrousel from './components/Carrousel.js'
import Catagories from './components/Catagory.js'
import Grid from './components/ItemsHome.js'
import Cart from './components/Cart.js';
import Footer from './components/Footer.js'
import SignIn from './pages/SignIn.js';
import CreateAccount from './pages/CreateAccount.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';






function App() {
  return (
    <>


      <Routes>
        <Route path="sign-in" element={<><Navbar /> <SignIn /></>}></Route>
        <Route path="create-account" element={<><Navbar /> <CreateAccount /></>}></Route>
        <Route path="cart" element={<><Navbar /> <Cart /></>} />
        <Route path="" element={<><Navbar /> <Catagories /> <Carrousel /> <Grid /></>} />
      </Routes>

      <Footer />
    </>



  );
}

export default App;
