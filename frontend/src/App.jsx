import { useEffect, useState } from 'react'
import './App.css'
import { Route, Router, Routes } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage'
import { CategoryPage } from './pages/CategoryPage'
import { SignupPage } from './pages/SignupPage'
import { ProductsPage } from './pages/ProductsPage'
import { ProductDetailsPage } from './pages/ProductDetailsPage'
import { Toast } from './components/Toast'
import { useSelector } from 'react-redux'
import { useDispatch } from "react-redux";
import { getMe } from "./services/UserService.js"
import { setUser } from "./redux/userRedux";


function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    const getProfile = async() => {
       const res = await getMe();
       console.log(`======${res}`);
       dispatch(setUser(res.data));
    }
    getProfile();
  }, [dispatch]);

  const user = useSelector(state => state.user);
  console.log(user);

  return (
    <>
      <Toast/>
      <Routes>
        <Route path='/' element={user ? <CategoryPage/> : <LoginPage />}></Route>
        <Route path='/category/:name' element={user ? <ProductsPage />: <LoginPage />}></Route>
        <Route path='/category/:name/product/:id' element={user ? <ProductDetailsPage />: <LoginPage />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/signup' element={<SignupPage />}></Route>
      </Routes>
    </>
  )
}

export default App
