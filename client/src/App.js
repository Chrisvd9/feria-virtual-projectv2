import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './views/Home';
import Detail from './views/Detail';
import Cart from './views/Cart';
import Login from './views/Login';
import Register from './views/Register';
import Profile from './views/Profile';
import Shipping from './views/Shipping';
import Payment from './views/Payment';
import Placeorder from './views/PlaceOrder';
import Order from './views/Order';
import UserList from './views/UserList';
import UserEdit from './views/UserEdit';
import ProductList from './views/ProductList';
import ProductEdit from './views/ProductEdit';
import OrderList from './views/OrderList';
import Search from './components/Search';

function App() {
  return (
    <Router>
        <Header/>
          <main className='py-3'>
            <Container>
              <Routes>
                <Route path='/register' element={<Register/>} />
                <Route path='/login' element={<Login/>}/>
                <Route path='/login/shipping' element={<Shipping/>}/>
                <Route path='/profile' element={<Profile/>} />
                <Route path='/cart' element={<Cart/>}>
                  <Route path=':id' element={<Cart/>} />
                  <Route path='' element={<Cart/>} />
                </Route>
                <Route path='/admin/user/:id/edit' element={<UserEdit/>}/>
                <Route path='/admin/userlist' element={<UserList/>}/>
                <Route path='/admin/product/:id/edit' element={<ProductEdit/>}/>
                <Route path='/admin/productlist' element={<ProductList/>}/>
                <Route path='/admin/orderlist' element={<OrderList/>}/>
                <Route path='/product/:id' element={<Detail/>} />
                <Route path='/order/:id' element={<Order/>}/>
                <Route path='/placeorder' element={<Placeorder/>} />
                <Route path='/payment' element={<Payment/>} />
                <Route path="/listarBusqueda/:id" element={<Search/>} />
                <Route path='/' element={<Home/>} />

              </Routes>
            </Container>
          </main>
        <Footer/>
    </Router>
  );
}

export default App;
