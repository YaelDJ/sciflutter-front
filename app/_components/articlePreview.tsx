import dynamic from 'next/dynamic';

import Image from 'next/image';

import type { ArticlePreview as ArticlePreviewI } from "../_interfaces/api";

import { BookmarkSimple } from '@phosphor-icons/react/dist/ssr/BookmarkSimple';

import LinkSimple from './linkSimple';

import { formatDate } from '../_utils/dateUtils';

import '@/styles/components/article-preview.scss'
import { checkCookieExist } from '../_actions/authActions';

interface Props {
  article: ArticlePreviewI
}

const DynamicBookmark = dynamic(() => import("./bookmarkCard"), {
  loading: () => (
    <div className="c-article-preview__bookmark">
      <BookmarkSimple size={40} className="c-article-preview__icon"/>
    </div>
  ),
  ssr: false,
});

const ArticlePreview: React.FC<Props> = async ({ article }) => {
  return (
    <li className="c-article-preview">
      <div className="c-article-preview__img">
        <Image
          src={article.image}
          alt="article preview image"
          width={300}
          height={500}
          style={{width: "100%", height: "auto"}}
        />
      </div>

      <div className="c-article-preview__text-box">
        <h4>{article.name}</h4>
        <p>{article.resume}</p>

        <div className="c-article-preview__footer">
          <div className="c-article-preview__author">
            <Image
              src={article.author.photos.profile}
              alt="author picture"
              width={40}
              height={40}
            />

            <div className="c-article-preview__author-info">
              <p>
                {article.author.name} {article.author.lastName}
              </p>

              <p>{formatDate(article.createdAt)}</p>
            </div>
          </div>

          <LinkSimple href={`/article/${article._id}`}>Leer Articulo</LinkSimple>
        </div>
      </div>

      {await checkCookieExist() && <DynamicBookmark articleId={article._id} />}
    </li>
  );
}

export default ArticlePreview