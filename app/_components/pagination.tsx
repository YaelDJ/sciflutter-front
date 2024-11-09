"use client"
import { useRouter, useSearchParams } from 'next/navigation'

import clsx from 'clsx'

import { CaretDoubleLeft, CaretDoubleRight, CaretLeft, CaretRight } from '@phosphor-icons/react'

import '@/styles/components/pagination.scss'

interface Props{
  pages: number
}

const Pagination: React.FC<Props> = ({ pages }) => {
  const searchParams = useSearchParams()
  const { push } = useRouter()
  const currPage = Number(searchParams.get("page")) || 1;
  const params = new URLSearchParams(searchParams);

  const pagesNumbers = Array.from(Array(pages).keys())

  const handleClickPage = (page: string) => {
    params.set("page", page);

    push(`?${params.toString()}`, { scroll: false });
  }

  const handleBackPage = () => {
    if (currPage === 1) return

    params.set("page", (currPage - 1).toString());
    push(`?${params.toString()}`, { scroll: false });
  }

  const handleNextPage = () => {
    if (currPage === pages) return

    params.set("page", (currPage + 1).toString());
    push(`?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="c-pagination">
      <button
        className={clsx(
          "c-pagination__item_arrow",
          currPage === 1 && "disable"
        )}
        onClick={() => handleClickPage('1')}
        disabled={currPage === 1}
      >
        <CaretDoubleLeft size={32} />
      </button>

      <button
        className={clsx(
          "c-pagination__item_arrow",
          currPage === 1 && "disable"
        )}
        onClick={handleBackPage}
        disabled={currPage === 1}
      >
        <CaretLeft size={32} />
      </button>

      {pagesNumbers.map((pageNumber) => {
        if (currPage === 1) {
          if (pageNumber + 1 <= 3) {
            return (
              <button
                key={pageNumber}
                className={clsx(
                  "c-pagination__item",
                  currPage === pageNumber + 1 && "active"
                )}
                onClick={() => handleClickPage((pageNumber + 1).toString())}
              >
                {pageNumber + 1}
              </button>
            );
          }
        } else if (currPage === pages) {
          if (pageNumber + 1 >= currPage - 2) {
            return (
              <button
                key={pageNumber}
                className={clsx(
                  "c-pagination__item",
                  currPage === pageNumber + 1 && "active"
                )}
                onClick={() => handleClickPage((pageNumber + 1).toString())}
              >
                {pageNumber + 1}
              </button>
            );
          }
        } else if (
          pageNumber + 1 === currPage - 1 ||
          pageNumber + 1 === currPage ||
          pageNumber + 1 === currPage + 1
        ) {
          return (
            <button
              key={pageNumber}
              className={clsx(
                "c-pagination__item",
                currPage === pageNumber + 1 && "active"
              )}
              onClick={() => handleClickPage((pageNumber + 1).toString())}
            >
              {pageNumber + 1}
            </button>
          );
        }
      })}

      <button
        className={clsx(
          "c-pagination__item_arrow",
          currPage === pages && "disable"
        )}
        onClick={handleNextPage}
        disabled={currPage === pages}
      >
        <CaretRight size={32} />
      </button>

      <button
        className={clsx(
          "c-pagination__item_arrow",
          currPage === pages && "disable"
        )}
        onClick={() => handleClickPage(pages.toString())}
        disabled={currPage === pages}
      >
        <CaretDoubleRight size={32} />
      </button>
    </div>
  );
}

export default Pagination