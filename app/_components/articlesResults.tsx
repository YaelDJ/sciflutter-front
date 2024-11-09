import type { ReactNode } from 'react'

import dynamic from 'next/dynamic';

const Pagination = dynamic(()=>import('./pagination'))

interface Props {
  pages: number,
  children: ReactNode
}

const ArticlesResults: React.FC<Props> = ({ pages, children }) => {
  return (
    <>
      <div className="l-results-articles">
        {children}
      </div>

      {pages > 1 && <Pagination pages={pages} />}
    </>
  );
}

export default ArticlesResults