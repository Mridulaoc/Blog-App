import { useEffect, useRef } from 'react'
import AddLikes from './AddLikes'
import dbServices from '../../appwrite/config'
import { Query } from 'appwrite'
import { useDispatch, useSelector } from 'react-redux'
import { setLikes } from '../../store/likeSlicer'
import { PiHandsClappingFill,PiHandsClappingBold } from "react-icons/pi";


const Likes = ({post,userData}) => {
    console.log(userData)
    const dispatch = useDispatch();
    const likesData = useSelector(state => state.likes.likes)
    console.log(likesData)

    const likesDataRef = useRef(likesData)

    const addLike = async()=>{
        const dbLikes = await dbServices.createLikes({
            post_id:post.$id,
            Liked_by:userData.$id
        })
        if(dbLikes){
            console.log(dbLikes)
        }
    }



    useEffect(()=>{
        dbServices.getLikes([Query.equal("post_id",`${post.$id}`)]).then((likes) => {
            if(likes){
                console.log(likes.documents)
                dispatch(setLikes(likes.documents))                
            }else{
                dispatch(setLikes([]))
            }
        })
    },[likesDataRef])

    const isAlreadyLiked = likesData && userData ? userData.$id === likesData.Liked_by: false;
    console.log(isAlreadyLiked)
  return (
    <div className='flex gap-3'>
      {/* <AddLikes userData={userData.$id} likes={likesData}/>{likesData.length} */}
      {
        isAlreadyLiked ? 
        (<button> <PiHandsClappingFill className='md:text-3xl text-lg cursor-pointer' /></button>):
        (<button onClick={()=>addLike()}>
        <PiHandsClappingBold className='md:text-3xl text-lg cursor-pointer' />
        </button>)
      }
      
    </div>
  )
}

export default Likes
