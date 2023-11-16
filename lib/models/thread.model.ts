import mongoose from "mongoose";
const threadSchema=new mongoose.Schema(
    {
        parentId:{
            type:String,
        }
        ,
        children:[ {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Thread'
        },
        ]
        ,
      text:{
        type:String,
        required:true,
      },
      author:{
        type:mongoose.Schema.Types.ObjectId,
    ref:"User",
require:true},



community:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Community',
},

createdAt:{
    type:Date,
    default:Date.now,
},


    }
)


const Thread=mongoose.models.Thread ||mongoose.model("Thread",threadSchema)

export default Thread