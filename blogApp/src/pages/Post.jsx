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

  const isAuthor = post && userData ? post.username === userData.$id: false;
  console.log(isAuthor)
  
  const deletePost = ()=>{

    dbServices.deletePost(post.$id).then((status)=>{
      if(status){
        dbServices.deleteFile(post.featuredImage);
        navigate('/')
      }
    })}

    if(post){
      const date= new Date(post.$createdAt);
      const options ={

        day :"numeric",
        month:"long",
        year:"numeric"
      }
      const formattedDate =date.toLocaleString("en-us",options)
      let createdDate = formattedDate;
      console.log(createdDate)
   }
 

  return post ? (
    <div>
      <Container>
        <div className='flex flex-col align-center gap-10 w-4/5 mx-auto border border-gray-600 my-20'>
         <img src={dbServices.getFilePreview(post.featuredImage)} alt={post.title} className='w-full border border-gray-400 '/>
         {
          isAuthor && (
            <div className='flex gap-3 mx-auto'>
                 <Link to={`/edit-post/${post.$id}`}>
              <Button className='bg-green-600'>
                Edit
              </Button>
            </Link>
            <Button onClick={deletePost} className='bg-red-600'    >
              Delete</Button>
            </div>
           
          )
         }
         <h2 className='capitalize text-xl md:text-3xl'>{post.title}</h2>
         <h3 className='md:text-2xl text-l'>Author : <span className='capitalize'>{post.author}</span></h3>
         {/* <span>Created On : ${createdDate}</span> */}
         <div>
          {parse(post.content)}
         </div>
        
        </div>
        
      </Container>
      
    </div>
  ):null;
}

export default Post
