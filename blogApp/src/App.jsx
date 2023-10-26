
import { useEffect, useState } from 'react'
import './App.css'
import { Header,Footer } from './components/index'
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth'
import {logIn,logOut} from './store/authSlicer'

function App() {

  const [loading,setLoading]= useState(true);
  const dispatch =useDispatch();

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userdata)=>{
      if(userdata){
        dispatch(logIn({userdata}))
      }
      else{
        dispatch(logOut())
      }
    })
      .finally(()=>setLoading(false))
    }
  ,[])
  



  return !loading ? (
    <>
      <div className='h-screen'>
      <Header/>     
      <h1>Blog App</h1>
      <Footer/>
      </div>
     
    </>
  ):null
}

export default App
