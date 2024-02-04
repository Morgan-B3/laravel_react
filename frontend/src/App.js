import logo from './logo.svg';
import './App.css';
import Users from './pages/Users.js';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import NewUser from './pages/NewUser.js';
import UserDetail from './pages/UserDetail.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Users/>} />
        <Route path='/nouvel-utilisateur' element={<NewUser/>} />
        <Route path='/user/:id' element={<UserDetail/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
