// import React, {useEffect, useState} from 'react'
// import dBServices from "../appwrite/config";
// import {Container, PostCard,Loader} from '../components'
// import { useSelector } from 'react-redux';
// import { Query } from 'appwrite';
// import { Link } from 'react-router-dom';

// function Home() {
//     const [posts, setPosts] = useState([])
//     const [loading,setLoading] = useState(true)
//     const userData = useSelector(state=>state.auth.userData)
//     console.log(userData.$id)
    

//     useEffect(() => {
//         // setLoading(true)
//         dBServices.getPosts([Query.equal("username", `${userData.$id}`)]).then((posts) => {
//             console.log(posts)
//             if (posts) {                
//                 setPosts(posts.documents)
//                 setLoading(false)
//             }
          
//         })
        
//     }, [])

    
  
//     if (posts?.length === 0) {
//         return (
//     //         <div className="w-full py-8 mt-4 text-center">
//     //             <Container>
//     //                 <div className="flex flex-wrap">
//     //                     <div className="p-2 w-full">
//     //                         <h1 className="text-2xl text-white   font-bold hover:text-gray-500">
//     //                             Login to read posts
//     //                         </h1>
//     //                     </div>
//     //                 </div>
//     //             </Container>
//     //         </div>
//     //     )
//     <div className='text-white'>
//     <h2 >Welcome <span>{userData.name}</span></h2>  
// <p>You have not added any posts yet. To read posts go to <Link to={'/all-posts'}>All Posts</Link></p>
// </div>
//         )
//     }
    
  
  
//     return (
//         <>
//         {loading ? 
//         (<Loader/>):(
//         <div className='w-full py-8'>
//             <Container>
//                 <h2 >Welcome <span>{userData.name}</span></h2>
//                 <div className='flex flex-wrap'>
//                     {posts.map((post) => (
//                         <div key={post.$id} className='p-2 w-1/4'>
//                             <PostCard {...post} />
//                         </div>
//                     ))}
//                 </div>
//             </Container>
//         </div>
//         )
//                     }
//         </>
//     )
// }

// export default Home

import React from 'react'

const Home = () => {
  return (
    <div>
      <h2>Welcome to this site</h2>
    </div>
  )
}

export default Home
