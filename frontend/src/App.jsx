import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Router, Routes } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage'
import { CategoryPage } from './pages/CategoryPage'
import { SignupPage } from './pages/SignupPage'
import { ProductsPage } from './pages/ProductsPage'
import { ProductDetailsPage } from './pages/ProductDetailsPage'
import { Toast } from './components/Toast'

function App() {

  return (
    <>
      <Toast/>
      <Routes>
        <Route path='/' element={<CategoryPage />}></Route>
        <Route path='/category/:name' element={<ProductsPage />}></Route>
        <Route path='/category/:name/product/:id' element={<ProductDetailsPage />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/signup' element={<SignupPage />}></Route>
      </Routes>
    </>
  )
}

export default App
