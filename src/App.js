import './App.css';
import {Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Header from './layout/Header';
import Footer from './layout/Footer';

function App() {
  return (
    <div className="wrapper">
      <div className='intro'>
        배틀 코딩
      </div>
      <div className='contents'>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
        </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
