import mongoose from 'mongoose'
let isConnected=false

export const connectToDB = async () => {

    mongoose.set('strictQuery',true)
   if(!process.env.MONGODB_URL) return console.log("mongoDB_Url not found")

   if(isConnected) {console.log("mongoDB is already connected"); return }

   try {
    await mongoose.connect(process.env.MONGODB_URL);
    isConnected=true
    console.log("mongoDB connected successfully")
   
}
catch(err){
console.log(err)
}
}


