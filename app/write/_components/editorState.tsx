import clsx from "clsx";
import { type FC } from "react";

import '@/styles/components/editor-state.scss'

interface Props {
  isSaved: boolean,
  wordsCount: number
}

const EditorState: FC<Props> = ({ isSaved, wordsCount }) => {
  return (
    <div className="c-editor-state">
      <p className={clsx("c-editor-state__save", !isSaved && "is-saving")}>
        {isSaved ? "Saved" : "Saving.."}
      </p>
      <p className="c-editor-state__word-count">
        Words: <span>{wordsCount}</span>
      </p>
    </div>
  );
}

export default EditorState