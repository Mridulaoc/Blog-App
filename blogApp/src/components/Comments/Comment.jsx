import React from 'react'

const Comment = ({author,$createdAt,comment}) => {

  const date = new Date($createdAt);
  console.log(new Intl.DateTimeFormat('en-US').format(date));
  const createdDate = new Intl.DateTimeFormat('en-US').format(date);


  

 
  return (
    <div className='w-full flex gap-1 flex-col items-start my-3' >
      <p className='capitalize'>{author}</p>
      <p>{createdDate}</p>
      <p className='my-3 md:text-base text-xs'>{comment}</p>
           
    </div>
  )
}

export default Comment
