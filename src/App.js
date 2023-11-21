
import Home from './page/Home';
import List from './page/List';
import Detail from './page/Detail';
import Context from './Context';
import { BrowserRouter, HashRouter, Routes, Route, Link } from 'react-router-dom';


import './scss/App.scss';


function App() {


  return (
    <Context>
      <HashRouter>
        <header className='header'>
          <div className='head'>
            <div className='logo'><Link to="/">홈</Link></div>
            <nav>
              <Link to="/">홈</Link>
              <Link to="/movie">무비</Link>
              <Link to="/tv">티비</Link>
            </nav>
          </div>
        </header>
        <main>
          
      


          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/:catagory' element={<List/>} />
            <Route path='/:catagory/:id' element={<Detail />} />
          </Routes>
        </main>
      </HashRouter>
    </Context>
  );
}

export default App;
