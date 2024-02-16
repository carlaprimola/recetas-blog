import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import CompShowBlogs from './blog/ShowBlogs';
import CompCreateBlog from './blog/CreateBlog';
import CompEditBlog from './blog/EditBlog';

Modal.setAppElement('#root');

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Blog de Recetas</h1>        
      </header>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={ <CompShowBlogs />} />
            <Route path='/create' element={ <CompCreateBlog />} />
            <Route path='/edit/:id' element={ <CompEditBlog />} />
            
        </Routes>
      </BrowserRouter>
      
      
    </div>
  );
}

export default App;