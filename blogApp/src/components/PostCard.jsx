import React from 'react'
import {Link} from 'react-router-dom'
import dbServices from '../appwrite/config'

const PostCard = ({$id,title,featuredImage}) => {
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full rounded-xl'>
            <div className='w-full justify-center mb-4'>
                <img src={dbServices.getFilePreview(featuredImage)} alt={title} />
            </div>
            <h2 className='text-white'>{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard

