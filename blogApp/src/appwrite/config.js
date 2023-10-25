import conf from '../conf/conf'
import { Client,ID,Databases, Storage,Query } from "appwrite";

export class DbServices{
    client=new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl) 
        .setProject(conf.appwriteProjectId);
        this.databases=new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title,slug,featuredImage,status,content,username}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    featuredImage,
                    status,
                    username,
                    content,
                }
            )
        } catch (error) {

            throw new Error(error)
            
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )
            return true;
        } catch (error) {
           console.log(error)
            return false;
        }
    }

    async updatePost(slug,{title,featuredImage,status,content}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    featuredImage,
                    status,
                    content,
                }
            )
            
        } catch (error) {
            console.log(error);
            
        }
    }

    async getPost(slug){
       try {
        await this.databases.getDocument(
            conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
        )
        return true;
       } catch (error) {
        console.log(error);
        return false;
       }
    }


    async getPosts(queries=[Query.equal("status","active")]){

        try {
            await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
            return true;
        } catch (error) {
            console.log(error)
            return false;
            
        }     

    }

    async upload(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
            )

            
        } catch (error) {
            console.log(error);
            
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
            conf.appwriteBucketId,
            fileId,
    
            )
            return true;
        } catch (error) {
            console.log(error)
            return false;
            
        }
       
    }

    getFilePreview(fileId){
        try {
            this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId,
            )
        } catch (error) {
            console.log(error)
            
        }
    }





}

const dbServices= new DbServices;
export default dbServices;

