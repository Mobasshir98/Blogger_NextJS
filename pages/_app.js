import '@/styles/globals.css'
import NavBar from './components/navbar'
import { Toaster } from 'react-hot-toast'
import { Suspense } from 'react'


export default function App({ Component, pageProps }) {
  return (
  <>
  <Suspense fallback={<div>Loading....</div>} >

  <NavBar/>
  
  <Component {...pageProps} />

  <Toaster/>
  
  </Suspense>
  
  </>
  )
  
}
