import React, {useEffect, useState} from 'react'
import dBServices from "../appwrite/config";
import authService from '../appwrite/auth';
import {Container, PostCard,Loader} from '../components'
import { useSelector } from 'react-redux';
import { Query } from 'appwrite';
import { Link } from 'react-router-dom';
import dbServices from '../appwrite/config';

function Home() {
    const [posts, setPosts] = useState([])
    const [loading,setLoading] = useState(true)
    const userData = useSelector(state=>state.auth.userData)
    
    
    

    useEffect(() => {
        // setLoading(true)

       if(userData)

        {
            dbServices.getPosts([Query.equal("username", `${userData.$id}`)]).then((posts) => {
                console.log(posts)
                if (posts) {                
                    setPosts(posts.documents)
                    setLoading(false)
                }
              
            })
    
        }else{
            setPosts([])
        }
        
           
        
        
    }, [])

    if (!userData) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl text-white   font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
//     <div className='text-white'>
//     <h2 >Welcome <span>{userData.name}</span></h2>  
// <p>You have not added any posts yet. To read posts go to <Link to={'/all-posts'}>All Posts</Link></p>
// </div>
            }
    
  
   
    return (
        <>
        { posts.length>0 ?
        (
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
        ):
        <Container>
                <h2 >Welcome <span>{userData.name}</span></h2>
                </Container>

                    }
        </>
    )
}

export default Home

