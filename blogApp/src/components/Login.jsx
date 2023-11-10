import  { useState } from 'react'
import {useForm}  from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth'
import {logIn} from '../store/authSlicer'
import {useDispatch} from 'react-redux'
import {Input, Button,Container} from './index'


const Login = () => {
    const dispatch = useDispatch();
    const navigate =useNavigate();
    const [error,setError]= useState("");
    const {register,handleSubmit} = useForm();

    const login =async(data)=>{
        console.log(data)
        setError("");
        try {
            const session = await authService.login(data);
            console.log(session)
           
        if (session) {
            const userData= await authService.getCurrentUser()
            console.log(userData);
            if (userData) {
                dispatch(logIn(userData))
                navigate('/home') 
            }           
        }
        } catch (error) {
            setError(error.message)
            
        }
        
    }
  return (
    <Container>
        <div className='w-2/5 border border-gray-500 mx-auto my-20 flex flex-col py-8 rounded-md'>
        <div>Logo</div>       
        <div className='flex gap-2 justify-center'>
        <p>Don&apos;t Have An Account?</p>
        <Link to={'/signup'}>
          Sign Up
        </Link> 
        </div>
        {error && <p>{error}</p>}       
        <form onSubmit={handleSubmit(login)}>
            <Input
            label='Email :'
            placeholder='Enter your email address'
            type='email'
            className='mb-2 text-black'
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
            className=' mb-2 text-black'
            {...register("password",{
                required:true,
            })}
            /> 
            <div className='flex justify-start'>
            <Button
            type='submit'>
            Sign In
            </Button> 
            </div>
            
        </form>      
        </div>
    </Container>
   
        
  )
}

export default Login
