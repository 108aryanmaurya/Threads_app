import { fetchUserPosts } from '@/lib/actions/user.actions'
import { redirect } from 'next/navigation'
import React from 'react'
import ThreadCard from '../cards/ThreadCard'
interface props{
    currentUserId:string,accountId:string,accountType:string
}
const ThreadTab = async({currentUserId,accountId,accountType}:props) => {
let result=await fetchUserPosts(accountId)
// console.log(accountId)
console.log(result)
if(!result) redirect('/')

  return (
  <section className='mt-9 flex flex-col gap-10'>
    {
        result.threads.map((thread:any)=>(
            <ThreadCard 
            key={thread._id}

            id={thread._id}
     currentUserId={currentUserId||""}
     parentId={thread?.parentId}
    content={thread.text}
    author={accountType==='User'?{name:result.name,image:result.image,id:result.id }:{name:thread.author.name,image:thread.author.image,id:thread.author.id}}
    createdAt={thread.createdAt}
    community={thread.community}
    comments={thread.childre}
            ></ThreadCard>
        ))
    }
  </section>
  )
}

export default ThreadTab