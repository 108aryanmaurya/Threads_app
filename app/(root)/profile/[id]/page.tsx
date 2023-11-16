import PostThread from "@/components/forms/PostThread";
import ProfileHeader from "@/components/shared/ProfileHeader";

import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import {Tabs,TabsContent,TabsList,TabsTrigger} from '@/components/ui/tabs'
import { profileTabs } from "@/constants";
import Image from "next/image";
import ThreadTab from "@/components/shared/ThreadTab";
async function page({params}:{params:{id:string}})
{
    const user=await currentUser()

    if(!user) return null;

    const userInfo=await fetchUser(params.id);
console.log(user.id )
console.log(userInfo.id )
if(!userInfo?.onboarded) redirect('/onboarding');

  return (
    <section className=''>
      <ProfileHeader 
      accountId={userInfo.id}
      authUserId={user.id}
      name={userInfo.name}
      username={userInfo.username}
      imgUrl={userInfo.image}
      bio={userInfo.bio}></ProfileHeader>
      <div className="mt-9">
        <Tabs defaultValue="threads"  className="w-full">
<TabsList className="tab">
{profileTabs.map((tab)=>(
<TabsTrigger key={tab.label} value={tab.value}>

<Image width={24} height={24}
src={tab.icon}
alt={tab.label}

className="object-contain"
></Image>

<p className="max-sm:hidden">{tab.label}</p>
{tab.label==="Threads"&& (<p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium  text-light-2 ">{
  userInfo?.threads?.length
}  </p>) }
</TabsTrigger>
))}
</TabsList>

{profileTabs.map((tab)=>(
  <TabsContent key={`content-${tab.label}`} value={tab.value} className="text-light-1 w-full ">
    <ThreadTab currentUserId={user.id} accountId={userInfo.id}
    accountType="User"
    >

    </ThreadTab>
  </TabsContent>
))}
        </Tabs>

      </div>
      </section>
  )
}

export default page