import Image from 'next/image'

import { checkAuthorFollow, getSavedArticlesId } from '@/app/_actions/featuresActions'

import '@/styles/components/article-options.scss'
import dynamic from 'next/dynamic'
import { checkCookieExist } from '@/app/_actions/authActions'
import { SavesProvider } from '@/app/_context/savesContext'
import { getLoggedUser } from '@/app/_actions/userActions'
import { UserProvider } from '@/app/_context/userContext'

interface Props{
  authorId: string,
  authorImg: string,
  articleId: string,
}

const DynamicArticleLike = dynamic(() => import('./articleLike'), { ssr: false })
const DynamicArticleSave = dynamic(() => import('./articleSave'), { ssr: false })
const DynamicArticleFollow = dynamic(() => import('./articleFollow'), { ssr: false })

const ArticleOptions: React.FC<Props> = async ({ articleId, authorId, authorImg }) => {
  const isFollow = await checkAuthorFollow(authorId);
  const isLiked = await checkAuthorFollow(articleId);
  const saves = await getSavedArticlesId()
  const loggedUser = await getLoggedUser()

  return (
    <menu className="c-article-options">
      <h3 className="c-article-options__heading">Opciones</h3>

      {await checkCookieExist() && <DynamicArticleLike articleId={articleId} liked={isLiked} />}

      {await checkCookieExist() && (
        <SavesProvider defaultValues={saves}>
          <DynamicArticleSave articleId={articleId} />
        </SavesProvider>
      )}
      
      {await checkCookieExist() && (
        <UserProvider initialValue={loggedUser}>
          <DynamicArticleFollow authorId={authorId} follow={isFollow} />
        </UserProvider>
      )}

      <a href={`/user/${authorId}`} className="c-article-options__author">
        <Image alt='author picture' src={authorImg} width={64} height={64} />
        <strong>Ver perfil &rarr;</strong>
      </a>
    </menu>
  );
}

export default ArticleOptions