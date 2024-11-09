import '@/styles/skeletons/article-preview.scss'

const ArticlePreviewSkeleton = () => {
  return (
    <li className="s-article-preview">
      <div className="s-article-preview__img">
        <div></div>
      </div>

      <div className="s-article-preview__text-box">
        <div className="s-article-preview__title"></div>
        <div className="s-article-preview__resume"></div>

        <div className="s-article-preview__footer">
          <div className="s-article-preview__author">
            <div className="s-article-preview__author-picture"></div>

            <div>
              <div className="s-article-preview__info-name"></div>

              <div></div>
            </div>
          </div>

          <div className="s-article-preview__button"></div>
        </div>
      </div>

      <div className="s-article-preview__bookmark"></div>
    </li>
  );
}

export default ArticlePreviewSkeleton