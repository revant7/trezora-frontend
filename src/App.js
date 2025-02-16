import './App.css';
import Navbar from './components/Navbar.js';
import Carrousel from './components/Carrousel.js'
import Catagories from './components/Catagory.js'
import Grid from './components/ItemsHome.js'
import './css/Index.css'

function App() {
  return (
    <>
      <Navbar />
      <Catagories />
      <Carrousel />
      <Grid />

    </>
  );
}

export default App;
