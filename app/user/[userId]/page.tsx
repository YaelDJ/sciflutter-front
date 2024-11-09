import { getUser } from '@/app/_actions/userActions';
import dynamic from 'next/dynamic';;
import ProfileSkeleton from '@/app/_skeletons/profileSkeleton';
import { revalidateTag } from 'next/cache';
import Message from '@/app/_components/message';
import ReturnButtons from '@/app/_components/returnButtons';

const DynamicProfile = dynamic(() => import('../_components/profilePage'), { loading: () => <ProfileSkeleton/> })

interface Props{
  params: {
    userId: string
  }
}

const Page: React.FC<Props> = async ({ params }) => {
  const apiResponse = await getUser(params.userId)
  
  revalidateTag('users')

  if (!apiResponse.success && !apiResponse.user) return (
    <div>
      <Message message='User not found' subMessage='Very the id or the link and retry'/>

      <ReturnButtons/>
    </div>
  )

  return (
    <DynamicProfile user={apiResponse.user!} />
  )
}

export default Page