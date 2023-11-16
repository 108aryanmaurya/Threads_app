import ThreadCard from "@/components/cards/ThreadCard"
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/dist/server/api-utils";
import Comment from '@/components/forms/Comment'
const page =async ({params}:{params:{id:string}}) => {
    
if(!params.id) return null;



const user=await currentUser()

if(!user) return null;

const userInfo=await fetchUser(user.id);

if(!userInfo?.onboarded){ redirect('/onboarding')}
const thread=await fetchThreadById(params.id)
// console.log(thread.children[0]._id)

return( <section className="relative ">
        <div>
        <ThreadCard key={thread._id}  
    id={thread._id}
     currentUserId={user?.id||""}
     parentId={thread?.parentId}
    content={thread.text}
    author={thread.author}
    createdAt={thread.createdAt}
    community={thread.community}
    comments={thread.childre} ></ThreadCard>
        </div>
<div className="mt-7 ">
    <Comment threadid={thread.id} currentuserImg={user.imageUrl} currentuserId={JSON.stringify(userInfo._id)}></Comment>
</div>
<div className="mt-10 "></div>
{thread.children.map((chilItem:any)=>{
   return <ThreadCard key={chilItem._id}  
    id={chilItem._id}
     currentUserId={chilItem?.id||""}
     parentId={chilItem?.parentId}
    content={chilItem.text}
    author={chilItem.author}
    createdAt={chilItem.createdAt}
    community={chilItem.community}
    comments={chilItem.children}
    isComment ></ThreadCard>
})}
    </section>)
}

export default page