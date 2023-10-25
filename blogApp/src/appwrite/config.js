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
                conf.appwriteDatabaseId
            )
        } catch (error) {

            throw new Error(error)
            
        }
    }


}

const dbServices= new DbServices;
export default dbServices;


