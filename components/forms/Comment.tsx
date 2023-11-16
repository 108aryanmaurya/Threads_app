'use client'
import {zodResolver} from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { CommentValidation, threadValidation } from '@/lib/validations/thread'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import * as z from "zod"
// import { updateUser } from '@/lib/actions/user.actions'
import { usePathname ,useRouter   } from 'next/navigation'
import { Textarea } from '../ui/textarea'
import { addCommentToThread } from '@/lib/actions/thread.actions'
import { getRandomValues } from 'crypto'
import { Input } from '../ui/input'
import Image from 'next/image'
interface props {
threadid:string;
currentuserId:string,
currentuserImg:string
}


const Comment = ({ threadid ,currentuserImg,currentuserId}:props) => {
  
  const router=useRouter()
  const pathname=usePathname()
  const  form=useForm({
      resolver:zodResolver(CommentValidation),
      defaultValues:{
      thread:"",
      
      }
  })
  
  const  onSubmit=async(values:z.infer<typeof CommentValidation>)=> {

// console.log(values)
// console.log(threadid)

  await addCommentToThread(threadid,values.thread,JSON.parse(currentuserId),pathname)
  form.reset()
}

  return(
    <Form {...form}>
       <form onSubmit={form.handleSubmit(onSubmit)} className="comment-form"
       >
         <FormField
           control={form.control}
           name='thread'
   
           render={({ field }) => (
             <FormItem className='flex items-center gap-3 w-full'>
               <FormLabel className=''
               >
                <Image   src={currentuserImg} alt="currentuser" height={48} width={48}  className='rounded-full object-cover'></Image>
               </FormLabel>
               <FormControl  className='border-none bg-transparent' >
                 <Input type='text' placeholder='Comment...'  {...field} className='text-light-1 outline-none no-focus' />
               </FormControl>
             
             </FormItem>
           )}
         />
         <button type='submit'   className='comment-form_btn'>Reply</button>
       </form>
        </Form>
       )
};

export default Comment;
