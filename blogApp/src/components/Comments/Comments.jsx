import React, { useEffect, useState } from 'react'
import dbServices from '../../appwrite/config'
import { Query } from 'appwrite'
import { CommentForm, Container} from '../index'
import Comment from '../Comments/Comment'

const Comments = ({post}) => {
  const [comments,setComments] =useState([])

  useEffect(()=>{
    dbServices.getComments([Query.equal("post_id", `${post.$id}`)]).then((comments) =>{
      console.log(comments)
      if(comments){
        setComments(comments.documents)
      }
      else{
        setComments([])
      }
    })
  },[])
  return (
    <Container>
    <div className='w-full flex flex-col mx-auto my-10'>
      <h2 className=' md:text-xl text-lg'>Responses ({comments.length})</h2>
      <CommentForm post={post}/>
      <div className='flex flex-col w-4/5 mx-auto '>
        {
          comments.map((comment)=>
          (  <div key={comment.$id} className=''>
              <Comment  {...comment}/>
              <hr className='bg-gray-700 border-0 h-px' />
            </div>
          )
          )
        }
      </div>
      
    </div>
    </Container>
  )
}

export default Comments
