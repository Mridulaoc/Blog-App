import { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {Input,Button, Container} from './index'
import {useForm} from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { logIn } from '../store/authSlicer'
import authService from '../appwrite/auth'

const Signup = () => {
    const {register, handleSubmit} =useForm()
    const navigate = useNavigate()
    const [error,setError]=useState("")
    const dispatch = useDispatch()
    

    const createAccount=async(data)=>{
        console.log(data)
        setError("")
        try {
            const userData = await authService.createAccount(data);
            console.log(userData)
            if(userData){
                const userData = await authService.getCurrentUser()
               
                if(userData) {
                dispatch(logIn(userData));
                navigate('/login')
                }
            }
        } catch (error) {
            setError(error.message)
            
        }
        

    }
  return (
    <Container>
    <div className='w-full md:w-4/5 lg:w-2/5 border border-gray-500 mx-auto   my-20 flex flex-col py-8 rounded-md'>
        <div className='w-full flex flex-col'>
            <div>Logo</div>
            <h2>Sign Up</h2>
            <p>Already Have An Account? </p>
            <Link to={'/login'}>Sign In</Link>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit(createAccount)}>
                <Input
                label='Name :'
                placeholder='Enter your name'
                className=' mb-2 text-black'
                {...register("name",{
                    required: true,
                })}
                
                />
                
                <Input
            type='email'
            label='Email:'
            placeholder='Enter email address'
            className=' mb-2 text-black'
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
            <div className='flex justify-start px-10'>
            <Button
            type='submit'>
            Create Account
            </Button> 
            </div>
            </form>
        </div>      
    </div>
    </Container>
  )
}

export default Signup
