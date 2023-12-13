import React, {useEffect, useState} from 'react'
import dBServices from "../appwrite/config";
import {Container, PostCard,Loader} from '../components'
import { useSelector } from 'react-redux';
import { Query } from 'appwrite';
import { Link, useParams } from 'react-router-dom';

function Dashboard() {
    const [posts, setPosts] = useState([])
    const [loading,setLoading] = useState(true)
    const {username} = useParams()
    const userData = useSelector(state=>state.auth.userData)
    console.log(userData.$id)
    

    useEffect(() => {
        // setLoading(true)
        dBServices.getPosts([Query.equal("username", `${username}`)]).then((posts) => {
            console.log(posts)
            if (posts) {                
                setPosts(posts.documents)
                setLoading(false)
            }
          
        })
        
    }, [])

    
  
    if (posts.length === 0) {
        return (    
    <div className='text-white w-full py-8 h-96'>
    <Container>
    <h2 >Welcome <span>{userData.name}</span></h2>  
    <p>
        You have not added any posts yet. To read posts go to <Link to={'/all-posts'}>All Posts</Link>
    </p>
    </Container>
   </div>
        )
    }
    
  
  
    return (
        <>
        {loading ? 
        (<Loader/>):(
        <div className='w-full py-8'>
            <Container>
                <h2 >Welcome <span>{userData.name}</span></h2>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
        )
                    }
        </>
    )
}

export default Dashboard
