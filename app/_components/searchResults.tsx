import FilterSort from './filterSort'
import AuthorsResults from './authorsResults'
import SearchResume from './searchResume'
import Message from './message'
import ArticlePreviewList from './articlePreviewList'
import ArticlesResults from './articlesResults'

import { getArticleFilters, getSearchArticles } from '../_actions/articleActions'
import { getAuthorFilters, getSearchAuthors } from '../_actions/userActions'

import '@/styles/layout/results.scss'

interface Props {
  articlesQueryString: string;
  authorsQueryString: string;
  searchQuery: string;
}

const SearchResults: React.FC<Props> = async ({ articlesQueryString, authorsQueryString, searchQuery }) => {
  const {articles, totalPages} = await getSearchArticles(
    searchQuery,
    articlesQueryString
  );
  const authors = await getSearchAuthors(
    searchQuery,
    authorsQueryString
  );

  const articleFilters = await getArticleFilters(searchQuery)
  const authorFilters = await getAuthorFilters(searchQuery)
  
  return (
    <section className="l-results">
      <SearchResume
        searchQuery={searchQuery}
        articlesResults={articles.length}
        authorsResults={authors.length}
      />

      {(articles?.length !== 0 || authors?.length !== 0) && (
        <FilterSort
          articleFilters={articleFilters}
          authorFilters={authorFilters}
        />
      )}

      {articles.length === 0 && authors.length === 0 ? (
        <Message
          message="Al parecer no hubo coincidencias para los parametros de busqueda."
          subMessage="Por favor intente con otros parametros."
        />
      ) : (
        <>
          {articles.length !== 0 && (
            <ArticlesResults pages={totalPages}>
              <ArticlePreviewList articleList={articles} emptyMessage="No articles found"/>
            </ArticlesResults>
          )}

          {authors.length !== 0 && <AuthorsResults authors={authors} />}
        </>
      )}
    </section>
  );
}

export default SearchResults