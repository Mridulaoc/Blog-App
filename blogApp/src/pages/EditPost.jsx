import React, { useEffect, useState } from 'react'
import dbServices from '../appwrite/config'
import {useParams, useNavigate} from 'react-router-dom'
import {Container, PostForm} from '../components/index'

const EditPost = () => {

   const [post, setPost] = useState()
   const {slug} = useParams()
   const navigate = useNavigate()

   useEffect(()=>{
    if(slug){
      dbServices.getPost(slug).then((post)=>{
        if(post){
          setPost(post)
        }       
      })
    }else {
      navigate('/');
    }
    
   },[slug,navigate])
  return post ? (
    <div className='py-8'>
      <Container>
        <PostForm post={post}/>
      </Container>
      
    </div>
  ):null;
}

export default EditPost
