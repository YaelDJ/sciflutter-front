import Image from 'next/image';

import type { DraftPreview as IDraftPreview } from "../_interfaces/api";

import LinkSimple from './linkSimple';

import '@/styles/components/article-preview.scss'

interface Props {
  draft: IDraftPreview
}

const DraftPreview: React.FC<Props> = ({ draft }) => {
  return (
    <li className="c-article-preview">
      <div className="c-article-preview__img">
        <Image
          src={draft.image ?? '/img/default-cover.png'}
          alt="article preview image"
          width={300}
          height={500}
          style={{width: "100%", height: "auto"}}
        />
      </div>

      <div className="c-article-preview__text-box">
        <h4>{draft.name}</h4>
        <p>{draft.resume}</p>

        <div className="c-article-preview__footer has-one">
          <LinkSimple href={`/write?draftId=${draft._id}`}>Edit draft</LinkSimple>
        </div>
      </div>
    </li>
  );
}

export default DraftPreview