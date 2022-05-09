import {Route, Routes} from 'react-router-dom'; 
import React from 'react';

import Register from './User/register';
import Login from './User/login';

const Mid = () => {
  return (
    <div>
        <Routes>
           <Route path="/register" element = {<Register/>} />
           <Route path="/login" element = {<Login/>} />
        </Routes>
    </div>
  )
}

export default Mid;
