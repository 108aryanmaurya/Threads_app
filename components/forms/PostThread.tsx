'use client'
import {zodResolver} from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { threadValidation } from '@/lib/validations/thread'
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
import { createThread } from '@/lib/actions/thread.actions'
import { getRandomValues } from 'crypto'
interface props{
    user:{
        id:string,
        objectid:string,
        username:string,
        name:string,
        bio:string,
        image:string
    }
    btnTitle:string
}


function PostThread({userId}:{userId:string})
{
  const router=useRouter()
  const pathname=usePathname()
  const  form=useForm({
      resolver:zodResolver(threadValidation),
      defaultValues:{
      thread:"",
     accountId:userId,
      
      }
  })
  const onSubmit=async(values:z.infer<typeof threadValidation>)=>{
    await createThread({text:values.thread,author:userId,communityId:null,path:pathname})

    router.push("/")
  }

return (
 <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10 flex flex-col 
    gap-10 justify-start"
    >
      <FormField
        control={form.control}
        name='thread'

        render={({ field }) => (
          <FormItem className='flex flex-col gap-3 w-full'>
            <FormLabel className='text-base-semibold text-light-2'
            >Content</FormLabel>
            <FormControl  className='no-focus border border-dark-4 bg-dark-3 text-light-1'>
              <Textarea rows={15}     {...field} className='account-form_input no-focus' />
            </FormControl>
            <FormMessage></FormMessage>
          
          </FormItem>
        )}
      />
      <Button type='submit' className='bg-primary-500'>Post Thread</Button>
    </form>
     </Form>
    
    )
}
export default PostThread