import './css/App.css'
import Navbar from './components/Navbar.jsx'
import Carrousel from './components/Carrousel.jsx'
import Catagories from './components/Catagory.jsx'
import Grid from './components/ItemsHome.jsx'
import Cart from './components/Cart.jsx'
import Footer from './components/Footer.jsx'
import SignIn from './pages/SignIn.jsx'
import CreateAccount from './pages/CreateAccount.jsx'
import Orders from './components/Orders.jsx'
import { Routes, Route } from 'react-router-dom'
import CatagoryPage from './components/CatagoryPage.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Profile from './components/Profile.jsx'
import TodaysDeals from './components/TodaysDeals.jsx'
import ProductPage from './pages/ProductPage.jsx'
import { AuthenticationProvider } from './context/AuthenticationContext.js'
import SearchResults from './components/SearchResults.jsx'
import { UpdateCartCountProvider } from './context/UpdateCartCount.js'
import Wishlist from './components/Wishlist.jsx'
import ContactUs from './components/ContactUs.jsx'
import Checkout from './pages/Checkout.jsx'




function App() {
  return (
    <>
      <AuthenticationProvider>
        <UpdateCartCountProvider>
          <div className="flex flex-col min-h-screen">
            <div className="flex-grow pt-28">
              <Routes>
                <Route exact path="/sign-in" element={<><Navbar /> <SignIn /></>}></Route>
                <Route exact path="/create-account" element={<><Navbar /> <CreateAccount /></>}></Route>
                <Route exact path="/contact-us" element={<><Navbar /> <ContactUs /></>}></Route>
                <Route exact path="/cart" element={
                  <ProtectedRoute>
                    <>
                      <Navbar />
                      <Cart />
                    </>
                  </ProtectedRoute>
                } />
                <Route exact path="/orders" element={
                  <ProtectedRoute>
                    <>
                      <Navbar />
                      <Orders orders={[]} />
                    </>
                  </ProtectedRoute>
                } />

                <Route exact path="/wish-list" element={
                  <ProtectedRoute>
                    <>
                      <Navbar />
                      <Wishlist />
                    </>
                  </ProtectedRoute>
                } />

                <Route exact path="/checkout" element={
                  <ProtectedRoute>
                    <>
                      <Navbar />
                      <Checkout />
                    </>
                  </ProtectedRoute>
                } />

                <Route exact path='/profile' element={
                  <ProtectedRoute>
                    <>
                      <Navbar />
                      <Profile />
                    </>
                  </ProtectedRoute>
                }></Route>
                <Route exact path="/today's-deals" element={<><Navbar /><TodaysDeals /></>} />
                <Route path="/catagory/:categoryName" element={<><Navbar /> <CatagoryPage /></>} />
                <Route path="/product/:productId" element={<><Navbar /> <ProductPage /></>} />
                <Route path="/search" element={<><Navbar /> <SearchResults /></>} />
                <Route exact path="/" element={<><Navbar /> <Catagories /> <Carrousel /> <Grid /></>} />
              </Routes>
            </div>
            <Footer />
          </div>
        </UpdateCartCountProvider>
      </AuthenticationProvider>
    </>



  );
}

export default App;
