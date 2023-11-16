import mongoose from "mongoose";
const userSchema=new mongoose.Schema(
    {
        id:{
            type:String,
            required:true,
        },
        username:{
            type:String,
            required:true,
            unique:true
        },
        name:{
            type:String,
            required:true
        },
         image:String,
         bio:String,
         threads:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Thread"
            }
         ],
         createdBy:{type:mongoose.Schema.Types.ObjectId,
        ref:'User'},
        
         onboarded:{
            type:Boolean,
            default:false,
         },
         communities:{
           type:mongoose.Schema.Types.ObjectId,
           ref:"Community" 
         },
         members:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            }
         ]
    }
)


const Community=mongoose.models.Community||mongoose.model("Community",userSchema)

export default Community