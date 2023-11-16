"use client"
import React from 'react'
import {  SignedIn ,SignOutButton} from '@clerk/nextjs'
 
import  {sidebarLinks } from '@/constants'
import Link from 'next/link.js'
import Image from 'next/image'
import { usePathname,useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
const LeftSideBar = () => {
  const pathname =usePathname()
  const router = useRouter()
const {userId} = useAuth()

  return (
    <section className='custom-scrollbar leftsidebar'>
<div className='flex w-full  flex-1 flex-col gap-6 px-6'>

{
  sidebarLinks.map((link)=>{
    // const  isActive

    const isActive =(pathname.includes(link.route)&& link.route.length>1)||pathname===link.route
     
    if(link.route==='/profile') link.route=`${link.route}/${userId}`
    return (
    <div className='text-black'>
               <Link href={link.route}
               
               key={link.label} 
               className={`leftsidebar_link ${isActive&& 'bg-primary-500'}`}>

               <Image width={24} height={24} src={link.imgURL} alt={link.label} />
               <p className='text-light-1 max-lg:hidden '>{link.label}</p>
               </Link>
    </div>
    )
})
}

</div>
<div className='mt-10 px-6'> 
<SignedIn>
      <SignOutButton signOutCallback={()=>{
        router.push('/sign-in')
      }}>
        <div className='flex cursor-pointer gap-4 p-4'>
<Image  width={25} height={25}  src="/assets/logout.svg" alt='logo' />
<p className='text-light-2 max-lg:hidden '>Logout </p>
        </div>
      </SignOutButton>

    </SignedIn></div>
    </section>
  )
}

export default LeftSideBar