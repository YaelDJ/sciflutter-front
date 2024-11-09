import dynamic from "next/dynamic";
import WriteGroup from "./writeGroup";
import { FC, useState } from "react";
import EditorState from "./editorState";
import { updateDraft } from "@/app/_actions/draftsActions";
import { NewData } from "@/app/_interfaces/draftController";

const Editor = dynamic(() => import("./simpleEditor"), {ssr: false})

interface Props{
  draftIntro?: string,
  updateCurrentDraftObj(newData: NewData): void;
  draftId: string;
}

const IntroductionEdit: FC<Props> = ({draftIntro, updateCurrentDraftObj, draftId}) => {
  const [introduction, setIntroduction] = useState(draftIntro ?? '')
  const [wordsCount, setWordsCount] = useState(0);
  const [isSaved, setIsSaved] = useState(true);


  const handleSetIntroduction = (data: string) => {
    setIntroduction(data.trim());
    updateCurrentDraftObj({introduction: data.trim()});
    setIsSaved(false);
  };

  const handleAutosave = async (data: string) => {
    const apiResponse = await updateDraft(draftId, {
      introduction: data,
    });
    if (apiResponse.success) {
      updateCurrentDraftObj({
        introduction: apiResponse.data.draft?.introduction,
      });
      setIsSaved(true);
    }
  };

  const handleSetWordsCount = (words: number) => {
    setWordsCount(words);
  };

  return (
    <>
      <WriteGroup>
        <p className="c-editor__label">
          Escribe la introduccion de tu articulo
        </p>

        <div className="c-editor__box">
          <Editor
            initialData={introduction}
            handleSetData={handleSetIntroduction}
            setWordCount={handleSetWordsCount}
            handleAutosave={handleAutosave}
          />
        </div>
      </WriteGroup>

      <WriteGroup>
        <EditorState isSaved={isSaved} wordsCount={wordsCount} />
      </WriteGroup>
    </>
  );
}

export default IntroductionEdit