'use client'
import { sidebarLinks } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import React from 'react'

const BottomBar = () => {
  const pathname=usePathname()
  const params=useParams()
  return (
    <section className='bottombar '><div className='bottombar_container'>
      
      {
  sidebarLinks.map((link)=>{
    // const  isActive

    const isActive =(pathname.includes(link.route)&& link.route.length>1)||pathname===link.route

    return (
    <div className='text-black'>
               <Link href={link.route}
               
               key={link.label} 
               className={`bottombar_link ${isActive&& 'bg-primary-500'}`}>

               <Image   src={link.imgURL} alt={link.label} width={24} height={24}/>
               <p className='text-white text-subtle-medium text-ligh-1  max-sm:hidden '>{link.label.split(/\s+/)[0]}</p>
               </Link>
    </div>
    )
})
}
      
      </div></section>
  )
}

export default BottomBar