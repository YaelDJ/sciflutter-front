"use client"
import { useRef, useState } from 'react';

import { CaretLeft } from '@phosphor-icons/react/dist/ssr/CaretLeft'
import { CaretRight } from '@phosphor-icons/react/dist/ssr/CaretRight';

import AuthorCard from './authorCard';

import { UserPreview } from '../_interfaces/api';

import '@/styles/components/carrousel.scss'
import clsx from 'clsx';

interface Props {
  showButtons: boolean;
  itemsList: UserPreview[];
}

const Carrousel: React.FC<Props> = ({ showButtons, itemsList }) => {
  const [isDragStart, setIsDragStart] = useState(false)
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartScrollLeft, setDragStartScrollLeft] = useState(0);

  const carouselRef = useRef<HTMLUListElement>(null)

  const scrollLeft = () => {
    const carousel = carouselRef.current;

    if (carousel) {
      carousel.scrollLeft -= carousel.clientWidth;
    }
  }

  const scrollRight = () => {
    const carousel = carouselRef.current;

    if (carousel) {
      carousel.scrollLeft += carousel.clientWidth;
    }
  }

  const dragStart = (e: any) => {
    const carousel = carouselRef.current;

    if (carousel) {
      setIsDragStart(true);

      setDragStartX(e.pageX || e.touches[0].pageX);
      setDragStartScrollLeft(carousel.scrollLeft);
    }
  };

  const dragStop = () => {
    const carousel = carouselRef.current
    
    if (carousel) {
      setIsDragStart(false)
      carousel.classList.remove("dragging");
    }
  }

  const dragging = (e: any) => {
    const carousel = carouselRef.current;

    if (carousel) {
      if (!isDragStart) return;
      e.preventDefault();

      carousel.classList.add("dragging");
      const deltaX = (e.pageX || e.touches[0].pageX) - dragStartX;

      carousel.scrollLeft = dragStartScrollLeft - deltaX;
    }
  };

  return (
    <div className={clsx("c-carrousel", !showButtons && 'has-no-btns')}>
      {showButtons && (
        <button
          onClick={scrollLeft}
          className="c-carrousel__btn"
        >
          <CaretLeft size={48} />
        </button>
      )}

      {/* <div className="c-carrousel__list-wrapper"> */}
        <ul
          className={clsx("c-carrousel__list", !showButtons && 'has-center-items')}
          onMouseDown={dragStart}
          onMouseUp={dragStop}
          onMouseMove={dragging}
          ref={carouselRef}
        >
          {itemsList.length > 0 &&
            itemsList.map((author: UserPreview) => (
              <AuthorCard author={author} key={author._id} />
            ))}
        </ul>
      {/* </div>  */}

      {showButtons && (
        <button
          className="c-carrousel__btn"
          onClick={scrollRight}
        >
          <CaretRight size={48} />
        </button>
      )}
    </div>
  );
}

export default Carrousel