import { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {Input,Button} from './index'
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
    <div className='w-full'>
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
                className='flex flex-col mx-auto mb-2 text-black'
                {...register("name",{
                    required: true,
                })}
                
                />
                
                <Input
            type='email'
            label='Email:'
            placeholder='Enter email address'
            className='flex flex-col mx-auto mb-2 text-black'
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
            className='flex flex-col mx-auto mb-2 text-black'
            {...register("password",{
                required:true,
            })}
            />
            <Button
            type='submit'>
            Create Account
            </Button> 
            </form>



        </div>
      
    </div>
  )
}

export default Signup
