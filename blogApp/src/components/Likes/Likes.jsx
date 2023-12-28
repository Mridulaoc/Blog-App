import React, { useRef,useEffect } from 'react'
import AddLikes from '../Likes/AddLikes'
import { useSelector,useDispatch } from 'react-redux'
import dbServices from '../../appwrite/config'
import { Query } from 'appwrite'
import { setLikes } from '../../store/likeSlicer'

const Likes = ({post,userData}) => {
    const userId = userData.$id || userData.userdata.$id
    const likesData = useSelector((state)=>{return state.likes.likes});
  const likesDataRef = useRef(likesData);
  const dispatch = useDispatch();

  useEffect(()=>{
    dbServices.getLikes([Query.equal("post_id", `${post.$id}`)]).then((likes) =>{
      console.log(likes)
      if(likes){
        dispatch(setLikes(likes));
      }
      else{
        dispatch(setLikes([]))
      }
    })
  },[likesDataRef])
    
  return (
    <div>
      <AddLikes post={post} userId={userId}  />
    </div>
  )
}

export default Likes
