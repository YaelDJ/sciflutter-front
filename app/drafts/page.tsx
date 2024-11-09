import { getSavedArticlesId } from '../_actions/featuresActions';

import { SavesProvider } from '../_context/savesContext';

import { HeadingSecondary } from '../_components/headings';
import Drafts from './_components/drafts';
import Articles from './_components/articles';

import '@/styles/pages/drafts.scss'

const Page = async () => {
  const saves = await getSavedArticlesId()

  return (
    <section className="l-drafts">
      <HeadingSecondary>My drafts</HeadingSecondary>

      <Drafts />

      <HeadingSecondary>My articles</HeadingSecondary>

      <SavesProvider defaultValues={saves}>
        <Articles />
      </SavesProvider>
    </section>
  );
}

export default Page