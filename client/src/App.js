import './App.css';
import Axios from 'axios'
import {  useState, useEffect } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import RegisterPage from './pages/registerPage';
import LoginPage from './pages/loginPage';
import PrivateRoutes from './private/privateRoute';
import Welcome from './pages/welcome';

function App() {

  


  return (

    <>

     <BrowserRouter>

        <Routes>

            <Route path='/' element={<LoginPage/>}/>
            <Route path='/reg' element={<RegisterPage/> }/>

            <Route  element={<PrivateRoutes/>}>

              <Route path='/welcome' element={<Welcome/>} exact/>

            </Route>

        </Routes>
     
     
     </BrowserRouter>


    </>
  );
}

export default App;
