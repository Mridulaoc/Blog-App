import React from 'react'
import AddLikes from '../Likes/AddLikes'

const Likes = ({post,userData}) => {
    const userId = userData.$id || userData.userdata.$id
  return (
    <div>
      <AddLikes post={post} userId={userId}  />
    </div>
  )
}

export default Likes
