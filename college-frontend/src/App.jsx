import Navbar from './components/navbar/navbar.jsx';
import About from './sections/about/about.jsx';
import Contact from './sections/contact/contact.jsx';
import Department from './sections/department/department.jsx';
import Facilities from './sections/facilities/facilities.jsx';
import Gallery from './sections/gallery/gallery.jsx';
import Hero from './sections/hero/hero.jsx';
import RankHolders from './sections/rankholders/rankholders.jsx';

function App() {

  return (
    <>
      <Navbar/>
      <Hero/>
      <About/>
      <Department/>
      <RankHolders/>
      <Facilities/>
      <Gallery/>
      <Contact/>
    </> 
  )
}

export default App
