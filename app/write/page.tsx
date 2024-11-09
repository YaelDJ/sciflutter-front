import dynamic from 'next/dynamic'

import { HeadingSecondary } from '../_components/headings'

import '@/styles/pages/write.scss'
import { getOneDraft } from '../_actions/draftsActions'
import { getLoggedUser, getToken } from '../_actions/userActions'
import { UserProvider } from '../_context/userContext'

const DynamicStepController = dynamic(()=> import('./_components/stepController'))

interface Props{
  searchParams: {
    draftId: string
  }
}

const Page: React.FC<Props> = async ({ searchParams }) => {
  let draft;
  const token = await getToken()
  const loggedUser = await getLoggedUser()

  if (searchParams.draftId) {  
    draft = await getOneDraft(searchParams.draftId)
  } else {
    draft = null
  }

  return (
    <div className='l-write'>
      <HeadingSecondary>Escribe un nuevo articulo</HeadingSecondary>

      <UserProvider initialValue={loggedUser}>
        <DynamicStepController draft={draft} token={token}/>
      </UserProvider>
    </div>
  )
}

export default Page