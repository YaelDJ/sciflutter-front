import { getSavedArticlesId } from '../_actions/featuresActions'
import MoreArticles from '../_components/moreArticles'
import MoreAuthors from '../_components/moreAuthors'
import { SavesProvider } from '../_context/savesContext'

interface Props{
  children: React.ReactNode
}

const Layout: React.FC<Props> = async ({ children }) => {
  const saves = await getSavedArticlesId()
  return (
    <>
      <SavesProvider defaultValues={saves}>
        {children}

        <MoreArticles />
      </SavesProvider>

      <MoreAuthors />
    </>
  );
}

export default Layout