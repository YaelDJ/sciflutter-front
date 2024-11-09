import dynamic from 'next/dynamic'

import MainSearch from './_components/mainSearch'
import MoreArticles from './_components/moreArticles'
import MoreAuthors from './_components/moreAuthors'
import { SavesProvider } from './_context/savesContext';
import { getSavedArticlesId } from './_actions/featuresActions';

interface Props {
  searchParams: {
    search?: string;
    year: string;
    discipline: string;
    sort: string;
    page: string
  };
}

const DynamicSearchResults = dynamic(()=> import('./_components/searchResults'))

const Home: React.FC<Props> = async ({ searchParams }) => {
  const articlesQueryString = `${searchParams.year ? '&year=' + searchParams.year : ''}${searchParams.discipline ? '&discipline=' + searchParams.discipline : ''}${searchParams.sort ? '&sort=' + searchParams.sort : ''}${searchParams.page ? '&page=' + searchParams.page : '&page=1'}`
  const authorsQueryString = `${searchParams.discipline ? '&discipline=' + searchParams.discipline : ''}${searchParams.sort ? '&sort=' + searchParams.sort : ''}`
  const savedArticles = await getSavedArticlesId();

  return (
    <>
      <MainSearch />

      <SavesProvider defaultValues={savedArticles}>
        {searchParams.search && (
          <DynamicSearchResults searchQuery={searchParams.search} articlesQueryString={articlesQueryString} authorsQueryString={authorsQueryString} />
        )}

        <MoreArticles />
      </SavesProvider>

      <MoreAuthors />
    </>
  )
}

export default Home