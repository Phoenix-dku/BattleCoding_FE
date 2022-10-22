import './App.css';
import {Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Match from './pages/Match';
import Mypage from './pages/mypage/Mypage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="wrapper">
      <Header/>
      <div className='contents'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/match/:language' element={<Match/>}/>
          <Route path='/mypage' element={<Mypage/>}/>
          <Route path='/*' element={<NotFound/>}/>
        </Routes>
      </div>

      <Footer/>
    </div>
  );
}

export default App;
