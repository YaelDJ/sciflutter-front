import Image from 'next/image'

import { formatLongDate } from '@/app/_utils/dateUtils'

import { Article } from '@/app/_interfaces/api'

import '@/styles/components/article-header.scss'

interface Props{
  article: Article
}

const ArticleHeader: React.FC<Props> = ({ article }) => {
  return (
    <header className="c-article-header">
      <div className="c-article-header__details">
        <div className="c-article-header__author">
          <Image src={article.author.photos.profile} alt='author picture' width={48} height={48}/>

          <div className="c-article-header__author-text">
            <strong>{article.author.name} {article.author.lastName}</strong>

            <p>{article.discipline}</p>
          </div>
        </div>

        <p className="c-article-header__date">{formatLongDate(article.createdAt)}</p>
      </div>
      <h1 className="c-article-header__title">{article.name}</h1>
    </header>
  )
}

export default ArticleHeader