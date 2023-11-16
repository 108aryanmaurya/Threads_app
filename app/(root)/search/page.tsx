import PostThread from "@/components/forms/PostThread";
import ProfileHeader from "@/components/shared/ProfileHeader";

import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { profileTabs } from "@/constants";
import Image from "next/image";
import ThreadTab from "@/components/shared/ThreadTab";
import UserCard from "@/components/cards/UserCard";

async function page()
{
    const user=await currentUser()

    if(!user) return null;

    const userInfo=await fetchUser(user.id);
    console.log(userInfo.id )
    if(!userInfo?.onboarded) redirect('/onboarding');

    //fetch alll users
    const result=await fetchUsers({
      userId:user.id,
      searchString:"",
      pageNumber:1,
      pageSize:25,
      sortBy:"desc"})
      
      console.log(result )
  return (
    <section><h1 className='head-text mb-10'>page
    
  </h1>
  
  
  <div className="mt-14  flex flex-col gap-9">
  {result.users.length===0?(<p className=" no-result">No Users </p>):(
    <>
    {result.users.map((user)=>(
      
      <UserCard key={user.id}
      id={user.id}
      name={user.name}
      username={user.username}
      imgUrl={user.image}
      personType="User"
      ></UserCard>
    ))
}    </>
  )
  }
      </div>
  </section>

  )
}

export default page