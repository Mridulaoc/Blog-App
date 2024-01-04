import {useEffect, useState} from 'react'
import {Container, PostCard,Loader} from '../components'
import { useSelector } from 'react-redux';
import { Query } from 'appwrite';
import { Link } from 'react-router-dom';
import dbServices from '../appwrite/config';
import authService from '../appwrite/auth';

function Home() {
    const [posts, setPosts] = useState([])
    const [loading,setLoading] = useState(true)
    const [user,setUser]=useState();
    const userData = useSelector(state=>state.auth.userData)
   
    
    
    

    useEffect(() => {

        authService.getCurrentSession().then((session) => {
            setUser(session)
            console.log(user)
        })
       
       
        // setLoading(true)
       

       if(userData)
        {              
            
            dbServices.getPosts([Query.equal("username", `${userData.$id||userData.userdata.$id}`)])
            .then((posts) => {    
                
                console.log(posts)
                if (posts) { 
                    console.log(posts.documents)               
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
            <div className="w-full py-8 mt-4 text-center h-96">
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

            }
    
  
   
    return (
        <>
        { posts.length>0 ?
        (
        <div className='w-full py-8'>
            <Container>
                <h2 className=' capitalize'>Welcome <span>{userData.name||userData.userdata.name}</span></h2>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='lg:w-2/6 p-2 w-full md:w-1/2'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
        ):
        <Container>
            <div className=' h-120'>
                <h2 >Welcome <span>{userData.name}</span></h2>
                <p>You have not added any posts yet. To read posts go to <Link to={'/all-posts'}><span className=' font-bold'>All Posts</span></Link>
                </p>
            </div>           
        </Container>
               

                    }
        </>
    )
}

export default Home

