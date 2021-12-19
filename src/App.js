import './App.css';
import Products from './components/products';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Cart from './components/cart'

function App() {
  // const [blnGridView, changeView] = useState(1);
  const state = useSelector(state => state.manageCart);
  return (
    <>
      <nav className="navbar navbar-light bg-light shadow bg-white rounded" style={{position: "fixed", width: "100%", zIndex: "99999"}}>
        <div className="">
          <NavLink className="navbar-brand ps-4" to="/"><b>Product Catalog</b></NavLink>
        </div>
        <div className="text-right" style={{textAlign: "right"}}>
          <button type='button' href="" className="btn btn-outline-primary me-2"><i className="fa fa-sign-in"></i> Login</button>
          <button type='button' href="" className="btn btn-outline-primary me-2"><i className="fa fa-user-plus"></i> Register</button>
          <NavLink to="/cart"><button type="button" href="/cart" className="btn btn-outline-primary me-2"><i className="fa fa-shopping-cart"></i> Cart ({state.length})</button></NavLink>
        </div>
      </nav>
      <div className="container pt-5" >
        <Routes>
          {/* <Route exact path="/" element={<Products blnGridView={blnGridView}/>}/> */}
          <Route exact path="/" element={<Products/>}/>
          <Route exact path="/cart" element={<Cart/>}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
