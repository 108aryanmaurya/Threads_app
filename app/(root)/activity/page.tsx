import PostThread from "@/components/forms/PostThread";
import ProfileHeader from "@/components/shared/ProfileHeader";

import { fetchUser, fetchUsers, getActivity } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { profileTabs } from "@/constants";
import Image from "next/image";
import ThreadTab from "@/components/shared/ThreadTab";
import UserCard from "@/components/cards/UserCard";
import Link from "next/link";

async function page()
{
    const user=await currentUser()

    if(!user) return null;

    const userInfo=await fetchUser(user.id);
    if(!userInfo?.onboarded) redirect('/onboarding');
    const activity=getActivity(userInfo._id)
  return (
    <section><h1 className="head-text mb-10">Activity</h1>
    <section className="mt-10 flex flex-col gap-5" >
        { activity.length > 0 ?( 
          <>
          {activity.map((activity)=>{
            <Link href={`/thread/${activity.parentId}`} key={activity._id}>
                  
                  <article className="activity-card">
                    <Image src={activity.author.image} alt="peofil_pic" className="rounded-full object-cover"></Image>
                    <p className="!text-small-regular text-light-1 ">
                      <span className="mr-1 text-primary-500">{activity.author.name}</span>{" "}
                      replied to your thread
                    </p>
                  </article>

            </Link>
          })}
          
          </>):<p className="!text-base-regular  text-light-3 ">No activity Yet</p>

    }
      </section>
      
      
      </section>

  )
}

export default page