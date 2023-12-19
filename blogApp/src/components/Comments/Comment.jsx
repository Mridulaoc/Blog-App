import React from 'react'

const Comment = ({author,$createdAt,comment}) => {

  

 
  return (
    <div >
      <p className='text-white '>{author}</p>
      <p>{comment}</p>
      
    </div>
  )
}

export default Comment
