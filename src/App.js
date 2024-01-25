import logo from './logo.svg';
import './App.scss';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
    <Routes>
      <Route path='/expenses'>
        <Route path='/expenses/login' element={<Login/>}/>
        <Route path='/expenses/' element={<Layout/>}>  
          <Route path='/expenses/wallet' element={<Home/>}/>
          <Route path='/expenses/dashboard' element={<Dashboard/>}/>
        </Route>
      </Route>
    </Routes>
    </>
  );
}

export default App;
