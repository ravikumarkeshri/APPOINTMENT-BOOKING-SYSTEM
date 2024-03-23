import { useState } from 'react'

import './App.css'
import Layout from './Layout/Layout'
import Header from './Components/Headers/Header'
import Footer from './Components/Footers/Footer'

function App() {


  return (
    <>
      <Header />
      <main className=''>
        <Layout />
      </main>
      <Footer />

    </>
  )
}

export default App
