"use server"

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose"
import Thread from "../models/thread.model";
import { FilterQuery, SortOrder, _FilterQuery } from "mongoose";

interface Params{
    userId:string
    ,name:string,
    username:string,
    bio:string
    ,
    image:string,
path:string
}
export async function updateUser({
    bio,
    name,
    image,
    username,
    userId,
    path}:Params
    ):Promise<void> {
    connectToDB();
// Sagittarius_Gargantua*^@#)
   
   try {
    
     const data=  await User.findOneAndUpdate(
          {
              id:userId
          },
          {
              username:username.toLowerCase(),
              bio,
              image,
              name,
              onboarded:true
          },
          {upsert:true}
          
       )
      
console.log(data)

       if(path==="/profile/edit")
      {
         revalidatePath(path) 
      }    // return 
   } catch (error:any) {
    
    console.log(error.message)
    // throw new Error(`Failed to create/update user: ${error.message}`)
   } 
}


export async function fetchUser(userId:String) {
    try {
        connectToDB()
        return await User.findOne({id:userId})
        // .populate({
        //     path:'communties',
        //     model:Community
        // })

    }
     catch (error:any) {
        // console.log(error.message)
        throw new Error(`Faile to fetch user: ${error.message}`);
        
    }
    
}



export async function fetchUserPosts(userId:string){
    try {
        connectToDB()
        // console.log(userId)
            const threads=await User.findOne({id:userId}).populate({
                path:'threads',
                model:Thread,
                populate:{
                    path:'children',
                    model:Thread,
                    populate:{
                        path:'author',
                        model:User,
                        select:'name image id'
                    }
                }
            })

            return threads
        
    } catch (error:any) {
        throw new Error(`Faile to fetch user: ${error.message}`);
        
    }

}

export async function fetchUsers({
    userId,
    searchString="",
    pageNumber=1,
    pageSize=20,
    sortBy="desc"
}:{userId:string,searchString?:string,  pageNumber?:number,
    pageSize?:number,
    sortBy?:SortOrder}) {
    try {
        connectToDB()

        const skipAmount=(pageNumber-1)*pageSize
        const regex=new RegExp(searchString,"i");
        const query:FilterQuery<typeof User> ={
            id:{$ne:userId},
        }

        if(searchString.trim()!==""){
query.$or=[{name:regex},{username:regex}]
        }
        
     const sortOptions={createdAt:sortBy}
     const usersQuery=User.find(query)
     .sort(sortOptions)
     .skip(skipAmount)
     .limit(pageSize)

const totalUsersCount=await User.countDocuments(query)
     const users=await usersQuery.exec();
     const isNext=totalUsersCount>skipAmount+users.length;

return{users,isNext}
    } catch (error:any) {
        throw new Error(`Faile to fetch user: ${error.message}`);
        
    }
    
}


export async function getActivity(userId:string){
    try {
        connectToDB()
        const userThreads=await Thread.find({author:userId})
        
        const childThreads=userThreads.reduce((acc,userThread)=>{
            return acc.concat(userThread.children)
        },[])

        const replies=await Thread.find({
            _id:{$in:childThreads},
            author:{$ne:userId}
        }).populate({
            path:'author',
            model:User,
            select:'name image _id'

        })

        return replies
    } catch (error) {
        
    }
}
