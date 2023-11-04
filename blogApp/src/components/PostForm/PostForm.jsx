import { useEffect,useCallback } from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useForm } from 'react-hook-form'
import {Button, Input, Select, RTE} from '../index'
import dbServices from '../../appwrite/config'

const PostForm = ({post}) => {
    const navigate = useNavigate()
    const userData = useSelector(state=>state.auth.userData)
    const {register, handleSubmit, watch, setValue,control, getValues}=useForm({
        defaultValues:{
            title: post ?. title || '',
            slug: post.slug || '',
            content : post ?. content || '',
            status: post ?. status || '',
        }
    })

    const submit = async (data)=>{
        if(post){
            const file = data.image[0]? await dbServices.upload(data.image[0]) : null;
            if(file){
                dbServices.deleteFile(post.featuredImage);
            }
             const dbPost= await dbServices.updatePost(post.$id,{
                ...data,
                featuredImage: file ? file.$id : undefined
             })

             if(dbPost){
                navigate('/post/${dbPost.$id}');
             }
        }else {
            const file = await dbServices.upload(post.image[0]);
            if(file){
                const fileId = file.$id;
                data.featuredImage= fileId;
                const dbPost= await dbServices.createPost({
                    ...data,
                    username:userData.$id
                })
                if(dbPost){
                    navigate('/post/${dbPost.$id}');
                }
            }
        }
    }

    const slugTransform = useCallback ((value) =>{
        if(value)
        return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d]+/g,'-')

        return null;
    },[]);
    

    useEffect(()=>{
        const subscription = watch ((value,{name})=>{
            if(name === 'title'){
            setValue('slug',slugTransform(value.title),{shouldValidate:true});
            }
        });
        return ()=>subscription.unsubscribe();

    },[watch,setValue,slugTransform])


  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        <div className=''>
            <Input
             label="Title" 
             placeholder="Title" 
             className=''
             {...register("title",{required:true})}             
             />
             <Input
             label="Slug"
             placeholder='Slug'
             className=''
             {...register("slug",{required:true})}
             onInput={(e)=>
             setValue("slug",slugTransform(e.target.value),{shouldValidate:true})}             
             />
             <RTE
              label="Content"
              name='content'
              control={control}
              defaultValue={getValues("content")}             
             />             
        </div>
        <div>
            <Input
            label="Featured Image"
            type="file"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            className=""
            {...register("image",{required:!post})}            
            />
            {post && 
            <img 
              src={dbServices.getFilePreview(post.featuredImage)}
              alt={post.title}
              className=''              
              />
            }
            <Select 
              label="Status"
              options={["Active", "Inactive"]}
              {...register("status",{required:true})}            
            />
            <Button
            type='submit'
            className='w-full' >
                {post ? "Update": "Submit"}
            </Button>         

            
        </div>
    </form>
  )
}

export default PostForm
