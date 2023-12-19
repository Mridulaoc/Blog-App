import React, { useEffect, useState } from 'react'
import dbServices from '../../appwrite/config'
import { Query } from 'appwrite'
import { CommentForm} from '../index'
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
    <div>
      <h2>Responses ({comments.length})</h2>
      <CommentForm post={post}/>
      <div className='flex flex-col w-full'>
        {
          comments.map((comment)=>
          (  <div key={comment.$id}>
              <Comment  {...comment}/>
            </div>
          )
          )
        }
      </div>
    </div>
  )
}

export default Comments
