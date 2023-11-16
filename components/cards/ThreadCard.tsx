import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
interface Props  {id:string;
    currentUserId:string;
   parentId:string | null;
    content:string,

    author:{username:String,
    image:string,
id:string},
  createdAt:string,
  community:{id:string,
name:string,
image:string},
   comments:{
    author:{
        image:string
    }
   }[],
isComment?:boolean,
}


const ThreadCard = (
    {id,
    currentUserId,
   parentId,
    content,
    author,
  createdAt,
  community,
   comments,
isComment}:Props
) => {
  

console.log(comments)
  return (
    <article  className={`rounded-${isComment?'px-0 xs:px-7' :'bg-dark-2 p-7'} flex  w-full flex-col   `}>

    <div className='flex items-start justify-between '> 
         <div className='flex w-full flex-1 flex-row gap-4 '> 
             <div className='flex flex-col items-center'>
                 <Link href={`/profile/${author.id}`} className='relative h-11 w-11'>
                    <Image src={author.image} className='rounded-full'  alt="profile image" fill></Image>
                </Link> 
                
            <div className='thread-card_bar'/>

             </div>
             <div className='flex w-full flex-col'>
             <Link href={`/profile/${author.id}`} className='w-fit'>


             <h4 className='cursor-pointer text-base-semibold text-light-1 '>{author?.username}</h4>

             </Link>

             <p className='mt-2 text-small-regular text-light-2'>{content}</p>

<div className={`mt-5 ${isComment&& 'mb-10'} flex flex-col gap-3 `}>
    <div className='flex gap-3.5 '>
        <Image width={24} height={24}  src="/assets/heart-gray.svg" alt='heart'  className='cursor-pointer object-contain'></Image>
        <Link href={`/thread/${id}`}>
        
        <Image width={24} height={24} src="/assets/reply.svg" alt='reply'  className='cursor-pointer object-contain'></Image>
        </Link>
        <Image width={24} height={24} src="/assets/repost.svg" alt='post'  className='cursor-pointer object-contain'></Image>
        <Image src="/assets/share.svg" alt='share' width={3} height={3} className='cursor-pointer object-contain'></Image>
    </div>

{isComment&&comments.length>0&&(
    <Link href={`/thread/${id}`}>
        <p>{comments?.length} replies</p>
    </Link>
)}

</div>

             </div>
         </div>
    </div>
    </article>
    
  )
}

export default ThreadCard