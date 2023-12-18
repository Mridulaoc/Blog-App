import React from 'react'
import {useForm} from "react-hook-form"
import{Button} from "../index"

const CommentForm = () => {

  const {register,handleSubmit}=useForm()

  const submit = () =>{

  }

  return (
    <div className='w-full'>
      <form onSubmit={handleSubmit(submit)} className='w-full  flex flex-col'>
        <textarea 
        rows="5" cols="75"
        placeholder="Share your comment"
        className='w-2/3 mx-auto bg-transparent rounded border border-gray-600 p-2 my-8'
        {...register("comment",{required:true})} 
        />
        <div className='w-2/3 mx-auto flex justify-end mb-5'>
        <Button
        type='submit'
        className=' '        
        >
          Submit
        </Button>
        </div>

      </form>
    </div>
  )
}

export default CommentForm
