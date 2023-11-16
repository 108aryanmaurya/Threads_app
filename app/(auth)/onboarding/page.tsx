import AccountProfile from '@/components/forms/AccountProfile'
import { fetchUser } from '@/lib/actions/user.actions'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import React from 'react'
const page =async () => {
  const user = await currentUser();
  if (!user) return null; // to avoid typescript warnings

  const userInfo = await fetchUser(user.id);
  console.log(userInfo);
  
  if (userInfo?.onboarded) redirect("/");

const userData={
  id:user?.id,
  objectid:userInfo?._id,
  username:userInfo?.username||user?.username,
  name:userInfo?.name||user?.firstName||"",
  bio:userInfo?.bio||"",
  image:userInfo?.image||user?.imageUrl,
}
  return (
    <main className='mx-auto flex max-w-3xl flex-col justify-start px-10 py-20'>
      <h1 className='head-text'> Onboarding</h1>
    <p className='text-light-2 mt-3  text-base-regular'>Complete your  Profile now to use Threads</p>
    <section className='mt-9 bg-dark-2 p-10'>
      <AccountProfile user={userData}  btnTitle="continue" ></AccountProfile>
    </section>
    </main>
  )
}

export default page