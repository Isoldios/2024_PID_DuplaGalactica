import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main_Page from './components/Main_Page.jsx';
import Login from './components/Login.jsx';
import ClassCreation from './components/ClassCreation.jsx';
import Create_Account from './components/Create_Account.jsx';
import Reset_Password from './components/Reset_Password.jsx';
import New_Password from './components/New_Password.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main_Page/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/create-account" element={<Create_Account/>}/>
        <Route path="/reset-password" element={<Reset_Password/>}/>
        <Route path="/new-password" element={<New_Password/>}/>
        <Route path="/class-creation" element={<ClassCreation/>}/>
      </Routes>
    </Router>
  );
}
/////ESTO PUEDE SERVIR PARA EL WEB PAGE APP, NO RECARGA TODA LA PAGINA CUANDO CAMBIAS PAGINA/////

// import { Link } from 'react-router-dom';

// function Navbar() {
//   return (
//     <nav>
//       <Link to="/">Home</Link>
//       <Link to="/about">About</Link>
//     </nav>
//   );
// }

export default App;
