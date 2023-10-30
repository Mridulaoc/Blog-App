import React, { useState } from 'react'
import {useForm}  from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth'
import {logIn as authLogin} from '../store/authSlicer'
import {useDispatch} from 'react-redux'
import {Input, Button} from './index'


const Login = () => {
    const dispatch = useDispatch();
    const navigate =useNavigate();
    const [error,setError]= useState("");
    const {register,handleSubmit} = useForm();

    const login =async(data)=>{
        setError("");
        try {
            const session = await authService.login(data);
        if (session) {
            const userData= await authService.getCurrentUser()
            if (userData) dispatch(authLogin(userData))
            navigate('/')            
        }
        } catch (error) {
            setError(error.message)
            
        }
        
    }
  return (
    <div className='w-full'>
        <div>Logo</div>
        <h2>Sign In</h2>
        <p>Don`&apos`t Have An Account?</p>
        <Link to={'/signup'}>
          Sign Up
        </Link> 
        {error && <p>{error}</p>}       
        <form onSubmit={handleSubmit(login)}>
            <Input
            type='email'
            {...register("email",{
                required:true,
                validate:{
                    matchPattern:(value)=>/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/ .test(value)|| "Email must be a Email address"
                }
            })}
            />
            <Input 
            label='Password :'
            placeholder='Enter your password'
            type='password'
            {...register("password",{
                required:true,
            })}
            />
            <Button
            type='submit'>
            Sign In
            </Button> 
        </form>      
    </div>
  )
}

export default Login
