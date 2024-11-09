import CardsList from './cardsList';
import dynamic from 'next/dynamic';
import ArticlePreviewSkeleton from '../_skeletons/articlePreviewSkeleton';
import { ArticlePreview } from '../_interfaces/api';
import Message from './message';
import { FC } from 'react';

const DynamicArticlePreview = dynamic(() => import('./articlePreview'), { loading: () => <ArticlePreviewSkeleton /> })

interface Props{
  articleList: ArticlePreview[];
  emptyMessage: string
}

const ArticlePreviewList: FC<Props> = ({ articleList, emptyMessage }) => {
  if (!articleList.length && !emptyMessage) return null;

  return (
    <CardsList type="articles">
      {!articleList.length && <Message message={emptyMessage} />}
 
      {articleList.map((article: ArticlePreview) => (
        <DynamicArticlePreview article={article} key={article._id} />
      ))}
    </CardsList>
  );
}

export default ArticlePreviewList