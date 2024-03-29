import { useState } from 'react'
import Navbar from './components/home/navbar'
import './App.css'
import Footer from './components/home/footer'
import Hero from './components/home/hero'
import Login from './components/data/login'
import Signup from './components/data/signup'
import Errorpage from './components/template/errorpage'

function App() {


  return (
    <>
       <Navbar/>
       <Errorpage/>
       <Footer/>
    </>
  )
}

export default App
