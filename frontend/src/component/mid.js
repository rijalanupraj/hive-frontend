import {Route, Routes} from 'react-router-dom'; 
import React from 'react';

import Register from './account/register';
import Login from './account/login';

const Mid = () => {
  return (
    <div>
        <Routes>
           <Route path="/" element = {<Register/>} />
           <Route path="/login" element = {<Login/>} />
        </Routes>
    </div>
  )
}

export default Mid;
