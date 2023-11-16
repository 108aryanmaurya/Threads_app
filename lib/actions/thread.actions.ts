'use server'
import mongoose from "mongoose"
import { revalidatePath } from "next/cache"
import Thread from "../models/thread.model"
import User from "../models/user.model"
import { connectToDB } from "../mongoose"
interface Params{
    text:string,
    author :string,
    communityId:string|null,
    path:string
}
export async function createThread({text,author,communityId,path}:Params) {
    try {
       connectToDB()
       const createThread=await Thread.create({
       text,author,community:null
    })
    
    
       await User.findByIdAndUpdate(author,{
        $push:{threads:createThread._id}
       })
    
       revalidatePath(path);
    
   } catch (error:any) {
    throw new Error(`Failed to create thread: ${error.message}`)
   }
}

export async function fetchPosts( pageNumber=1,pageSize=20)
{
connectToDB()
try {
    
    //calculate the nuber of posts to skip
    
    const skipAmount=(pageNumber-1)*pageSize

// fetch the  posts that have no parents (top-level threads...)
const postsQuery=await Thread.find({parentId:{$in:[null,undefined]}}).sort({createdAt:'desc'}).skip(skipAmount).limit(pageSize).populate({path:'author',model:User}).populate({
    path:'children',
    populate:{
path:'author',
        model:User,
        select:"_id name parentId image"
    }
})

const totalDocuments=await Thread.countDocuments({parentId:{$in:[null,undefined]}})

const  posts=await postsQuery;
const  isNext=totalDocuments>skipAmount+posts.length;

return {posts,isNext}
// return {postsQuery,totalDocuments}
} catch (error:any) {
    throw new Error(`Failed to create thread: ${error.message}`)
   }

}


export async function fetchThreadById(id:string){
    connectToDB()
    try {
        const thread=await Thread.findById(id)
        .populate({path:'author',
                   model:User,
                   select:"_id id name image"})
                   
        .populate(
            {path:'children',
        populate:
                [
                    {path:'author',
                    model:User,}
                    ,{
                       path:'children',
                       model:'Thread',
                       populate:{
                              path:'author',
                              model:User,
                              select:"_id id name parentId image"
                                }
                    }
                ]
            }
         )

        const thread2=await thread
        console.log(thread2)
        console.log("thread2")
        return thread2
    
    } catch (error:any) {
        throw new Error(`Failed to create thread: ${error.message}`)
       }
}



export async function addCommentToThread(
    threadid: string,
    commentText: string,
    userId: string,
    path: string
) {
    connectToDB();


    try {
        // Find the original thread by its ID
        console.log(threadid)
        let originalThread = await Thread.findById(threadid);

        if (!originalThread) {
            throw new Error("Thread not found");
        }


        // Create the new comment thread
        const commentThread = new Thread({
            text: commentText,
            author: userId,
            parentId: threadid, // Set the parentId to the original thread's ID
        });
        

        // Save the comment thread to the database
        const savedCommentThread = await commentThread.save();

        // Check if the originalThread has a children property; if not, initialize it as an array
        if (!originalThread.children) {
            originalThread.children = [];
        }

        if (mongoose.Types.ObjectId.isValid(savedCommentThread._id)) {
            // Add the comment thread's ID to the original thread's children array
          await  originalThread.children.push(savedCommentThread._id);

            // Save the updated originalThread to the database
            await originalThread.save();
        } else {
            throw new Error("Invalid comment thread ID");
        }

        revalidatePath(path);
        
        // Return the savedCommentThread or any other relevant data you want to return
        return savedCommentThread;
    } catch (error) {
        throw new Error(`Failed to add comment: ${error.message}`);
    }
}