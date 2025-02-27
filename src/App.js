import './css/App.css'
import Navbar from './components/Navbar.js'
import Carrousel from './components/Carrousel.js'
import Catagories from './components/Catagory.js'
import Grid from './components/ItemsHome.js'
import Cart from './components/Cart.js'
import Footer from './components/Footer.js'
import SignIn from './pages/SignIn.js'
import CreateAccount from './pages/CreateAccount.js'
import Orders from './components/Orders.js'
import { Routes, Route } from 'react-router-dom'
import CatagoryPage from './components/CatagoryPage.js'
import ProtectedRoute from './components/ProtectedRoute.js'
import Profile from './components/Profile.js'
import TodaysDeals from './components/TodaysDeals.js'
import ProductPage from './pages/ProductPage.js'
import { AuthenticationProvider } from './context/AuthenticationContext.js'
import SearchResults from './components/SearchResults.js'
import { UpdateCartCountProvider } from './context/UpdateCartCount.js'
import Wishlist from './components/Wishlist.js'
import ContactUs from './components/ContactUs.js'




function App() {
  return (
    <>
      <AuthenticationProvider>
        <UpdateCartCountProvider>
          <div className="flex flex-col min-h-screen">
            <div className="flex-grow">
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
                <Route path="/product/:asin" element={<><Navbar /> <ProductPage /></>} />
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
