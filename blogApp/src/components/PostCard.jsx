import React from 'react'
import {Link} from 'react-router-dom'
import dbServices from '../appwrite/config'
import {Container} from './index'

const PostCard = ({$id,title,featuredImage,author}) => {

  return (
    
    <Link to={`/post/${$id}`}>
        <div className=' rounded-md bg-white flex flex-col content-center shadow-lg'>
            <div className='p-5'>
                <img src={dbServices.getFilePreview(featuredImage)} alt={title} className='w-full h-56 object-cover' />
            </div>
            <h2 className='text-black capitalize py-4 bold'>{title}</h2>
            <p className='text-black pb-4 capitalize '>Author : {author}</p>
        </div>
    </Link>
  
  )
}

export default PostCard

