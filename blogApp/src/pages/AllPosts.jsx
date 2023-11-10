import React, { useEffect, useState } from 'react'
import dbServices from '../appwrite/config'
import { Container,PostCard } from '../components/index'


const AllPosts = () => {

  const [posts,setPosts]=useState([])

  useEffect(()=>{
    dbServices.getPosts([]).then((posts)=>{
        if(posts){
          setPosts(posts.documents);
          console.log(posts)
          
        }
    })
  },[])

  return (
    <Container>
    <div className='w-full py-20' >     
        <div className='flex flex-wrap '>
          {posts.map((post)=>(
            <div key={post.$id} className='lg:w-2/6 p-2 w-full md:w-1/2'>
              <PostCard {...post} />
            </div>
          ))}
        </div>

  
    </div>
    </Container>
  )
}

export default AllPosts
