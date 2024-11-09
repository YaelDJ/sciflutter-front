import '@/styles/layout/more.scss'

import { HeadingSecondary } from './headings'
import ArticlePreviewList from './articlePreviewList'
import { getMoreArticles } from '../_actions/articleActions'

const MoreArticles: React.FC = async () => {
  const moreArticles = await getMoreArticles()

  return (
    <aside className="l-more">
      <HeadingSecondary>Mas articulos</HeadingSecondary>

      <ArticlePreviewList articleList={moreArticles} emptyMessage='There are no recommended articles'/>
    </aside>
  );
}

export default MoreArticles