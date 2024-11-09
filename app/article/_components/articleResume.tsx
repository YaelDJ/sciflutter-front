import ArticleSection from './articleSection'
import ArticleIndex from './articleIndex';
import ArticleOptions from './articleOptions';

import '@/styles/layout/article-resume.scss'
import { Article } from '@/app/_interfaces/api';

interface Props {
  article: Article;
}

const ArticleResume: React.FC<Props> = ({ article }) => {
  return (
    <div className="l-article-resume">
      <div>
        <ArticleSection>
          <h2>Resumen</h2>
          <p>{article.resume}</p>
        </ArticleSection>

        <ArticleSection>
          <h2>Introduccion</h2>
          <div dangerouslySetInnerHTML={{ __html: article.introduction }}></div>
        </ArticleSection>
      </div>

      <aside>
        {/* <ArticleIndex /> */}

        <ArticleOptions
          authorId={article.author._id!}
          authorImg={article.author.photos.profile}
          articleId={article._id}
        />
      </aside>
    </div>
  );
}

export default ArticleResume