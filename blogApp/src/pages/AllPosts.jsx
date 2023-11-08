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
    <div className='w-full'>
      <Container>
        <div className='flex flex-wrap'>
          {posts.map((post)=>(
            <div key={post.$id} className='w-1/4'>
              <PostCard {...post}/>
            </div>
          ))}
        </div>

      </Container>
    </div>
  )
}

export default AllPosts
