import React from 'react'
import {PiHandsClappingBold} from "react-icons/pi";
import dbServices from '../../appwrite/config';
import { useDispatch, useSelector } from 'react-redux';
import { addLikes, deleteLikes } from '../../store/likeSlicer';

const AddLikes = ({post, userId}) => {
    const dispatch = useDispatch();
    const likesData = useSelector(state => state.likes.likes);

    const addLike = async()=>{
          
        //    dbServices.getLikes("Liked_by", userId).then((likes)=>{
        //         if(likes){
        //         dbServices.deleteLike(likesData.$id);
        //         dispatch(deleteLikes(likesData.$id));
        //     }
                
                const dbLikes = await dbServices.createLikes({
                    post_id: post.$id,
                    Liked_by:userId,
                })
                console.log(dbLikes);
                if(dbLikes){
                    dispatch(addLikes(dbLikes));        
              
           

           }}        
        
  
        



  return (
    <div>
        <button onClick={()=>addLike()}>
        <PiHandsClappingBold className='md:text-3xl text-lg cursor-pointer' />
        </button>
      
    </div>
  )
}

export default AddLikes
