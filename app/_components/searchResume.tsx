import '@/styles/components/search-resume.scss'

interface Props{
  searchQuery: string,
  articlesResults: number,
  authorsResults: number
}

const SearchResume: React.FC<Props> = ({searchQuery, articlesResults, authorsResults}) => {
  return (
    <div className="c-search-resume">
      <p className="c-search-resume__search">
        Resultados para &quot;{searchQuery}&quot;
      </p>

      <p className="c-search-resume__count">
        {articlesResults} articulos, {authorsResults} autores
      </p>
    </div>
  );
}

export default SearchResume