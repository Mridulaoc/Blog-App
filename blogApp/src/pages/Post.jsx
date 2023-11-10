import React, { useEffect, useState } from 'react'
import dbServices from '../appwrite/config'
import { Button, Container} from '../components/index'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import parse from 'html-react-parser'

const Post = () => {
  const [post, setPost]=useState(null);  
  const {slug} = useParams();
  const navigate = useNavigate();
  const userData = useSelector(state=>state.auth.userData);
  console.log(userData)

 
  useEffect(()=>{
    if (slug){
      
      dbServices.getPost(slug).then((post)=>{
        console.log(post)
         
        if(post) setPost(post);      
        
        else navigate('/');
        
      })
    }
    else navigate('/')
     
      
  },[slug, navigate])

  const isAuthor = post && userData ? userData.$id === post.username : false;
  if(post){
     const date= new Date(post.$createAt);
     const craetedDate = date.toLocaleString("en-us",{
         day :"numeric",
         month:"long",
         year:"numeric"
     })
  }

  const deletePost = ()=>{

    dbServices.deletePost(post.$id).then((status)=>{
      if(status){
        dbServices.deleteFile(post.featuredImage);
        navigate('/')
      }
    })}

  return post ? (
    <div>
      <Container>
        <div className='px-40 w-4/5 mx-auto border border-gray-600 my-20'>
         <img src={dbServices.getFilePreview(post.featuredImage)} alt={post.title} className=''/>
         <h2 className='capitalize text-5xl'>{post.title}</h2>
         <div>
          {parse(post.content)}
         </div>
         {
          isAuthor && (
            <div>
                 <Link to={`/edit-post/${post.$id}`}>
              <Button>
                Edit
              </Button>
            </Link>
            <Button onClick={deletePost}    >
              Delete</Button>
            </div>
           
          )
         }
        </div>
        
      </Container>
      
    </div>
  ):null;
}

export default Post
