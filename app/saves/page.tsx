import { Metadata } from "next";

import { HeadingSecondary } from "../_components/headings";
import SavesList from "./_components/savesList";

import { SavesProvider } from "../_context/savesContext";

import { getSavedArticlesId } from "../_actions/featuresActions";

import '@/styles/pages/saves.scss'

export const metadata: Metadata = {
  title: 'Saves'
}

const Page: React.FC = async () => {
  const saves = await getSavedArticlesId()

  return (
    <section className="l-saves">
      <HeadingSecondary>Mis favoritos</HeadingSecondary>

      <SavesProvider defaultValues={saves}>
        <SavesList />
      </SavesProvider>
    </section>
  );
}

export default Page