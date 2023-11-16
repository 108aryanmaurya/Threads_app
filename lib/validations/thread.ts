import * as z from 'zod'

export const threadValidation=z.object({
    thread:z.string().nonempty().min(3,{message:'mininmum 3 characters'}),
   accountId:z.string()
})

export const CommentValidation=z.object({
    thread:z.string().nonempty().min(3,{message:'mininmum 3 characters'}),
//    accountId:z.string()
})