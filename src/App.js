import './css/App.css';
import Navbar from './components/Navbar.js';
import Carrousel from './components/Carrousel.js'
import Catagories from './components/Catagory.js'
import Grid from './components/ItemsHome.js'


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
