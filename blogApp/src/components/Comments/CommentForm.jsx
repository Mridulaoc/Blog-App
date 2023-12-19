import React from 'react'
import {useForm} from "react-hook-form"
import{Button} from "../index"
import dbServices from '../../appwrite/config'
import { useSelector } from 'react-redux'

const CommentForm = ({post}) => {

  const userData =  useSelector((state)=>state.auth.userData);

  const {register,handleSubmit}=useForm()

  const submit = async (data) =>{

    const dbComment = await dbServices.createComment({
             ...data,
             user_id:userData.$id, 
             post_id:post.$id,
             author:userData.name
    })
    console.log(dbComment)

  }

  return (
    <div className='w-full'>
      <form onSubmit={handleSubmit(submit)} className='w-4/5 mx-auto flex flex-col'>
        <textarea 
        rows="5" cols="75"
        placeholder="Share your thoughts..."
        className='w-full  bg-transparent rounded border border-gray-600 p-2 my-8'
        {...register("comment",{required:true})} 
        />
        <div className='w-full flex justify-end mb-5'>
        <Button
        type='submit'
        >
          Submit
        </Button>
        </div>

      </form>
    </div>
  )
}

export default CommentForm
