import "@/styles/layout/more.scss";

import { HeadingSecondary } from './headings';
import AuthorCardList from './authorCardList';
import { getMoreAuthors } from "../_actions/userActions";

const MoreAuthors: React.FC = async () => {
  const moreAuthors = await getMoreAuthors()

  return (
    <aside className="l-more">
      <HeadingSecondary>Descubre autores</HeadingSecondary>

      <AuthorCardList authorsList={moreAuthors} emptyMessage='No users recommended found'/>
    </aside>
  );
}

export default MoreAuthors