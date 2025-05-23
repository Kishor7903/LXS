import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React from 'react'
import { Outlet } from 'react-router-dom'

function PolicyLayout() {
  return (
   <>
    <Header className="h-16" />  
    <main>
        <Outlet />
    </main>
    <footer className="bg-[rgb(8,43,61)]">
        <Footer />
      </footer>
   </>
  )
}

export default PolicyLayout
