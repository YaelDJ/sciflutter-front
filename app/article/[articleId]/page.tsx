import { revalidateTag } from 'next/cache'

import { getArticle, getRequestedArticle } from '@/app/_actions/articleActions'

import ArticleHeader from '../_components/articleHeader'
import ArticleResume from '../_components/articleResume'
import ArticleBody from '../_components/articleBody'

// import '@/styles/layout/article.scss'
import '@/styles/pages/article.scss'
import { checkAdminCookieExist } from '@/app/_actions/authActions'
import Message from '@/app/_components/message'
import ReturnButtons from '@/app/_components/returnButtons'
import ArticleBibliography from '../_components/articleBibliography'

interface Props{
  params: {
    articleId: string
  }
}

const Page: React.FC<Props> = async ({ params }) => {
  revalidateTag("articles")
  let article

  if(checkAdminCookieExist()) article = await getRequestedArticle(params.articleId);
  else article = await getArticle(params.articleId)

  if (!article) return (
    <div>
      <Message message='Article not found' subMessage='Verify the id or the link and retry' />
      <ReturnButtons />
    </div>
  )

  console.log(article.content)
  

  return (
    <article className="l-article">
      <ArticleHeader article={article} />

      <ArticleResume article={article} />
      
      <ArticleBody>
        <div dangerouslySetInnerHTML={{ __html: article.content }}></div>
      </ArticleBody>

      {/* <ArticleBibliography bibliography={article.bibliography} /> */}
    </article>
  );
}

export default Page