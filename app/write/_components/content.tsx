import { useState } from 'react';
import dynamic from 'next/dynamic';

import { updateDraft } from '@/app/_actions/draftsActions';

import { useAlertContext } from '@/app/_context/alertContext';

import { useCurrentDraft } from './stepController';
import WriteButtons from './writeButtons';
import EditorContainer from './editorContainer';
import WriteGroup from './writeGroup';

const Editor = dynamic(() => import('./advanceEditor'), { ssr: false })
const EditorSimple = dynamic(() => import('./simpleEditor'), { ssr: false })
const EditorState = dynamic(()=>import('./editorState'))

const Content = () => {
  const { handleNextStep, handlePrevStep, currentDraft, token, updateCurrentDraftObj } = useCurrentDraft()
  const { setAlert } = useAlertContext(state => state);
  const [contentWords, setContentWords] = useState(0)
  const [bibliographyWords, setBibliographyWords] = useState(0);
  const [content, setContent] = useState(currentDraft?.content ?? "")
  const [contentIsSaved, setContentIsSaved] = useState(true);
  const [bibliography, setBibliography] = useState(currentDraft?.bibliography ?? "");
  const [bibliographyIsSaved, setBibliographyIsSaved] = useState(true);

  const handleSetContent = (data: string) => {
    setContent(data.trim());
    updateCurrentDraftObj({ content: data.trim() })
    setContentIsSaved(false);
  };

  const handleSetBibliography = (data: string) => {
    setBibliography(data.trim());
    updateCurrentDraftObj({ bibliography: data.trim() });
    setBibliographyIsSaved(false);
  };

  const saveData = async () => {
    const apiResponse = await updateDraft(currentDraft?._id!, { content, bibliography });
    if (apiResponse.success) updateCurrentDraftObj({ content: apiResponse.data.draft?.content, bibliography: apiResponse.data.draft?.bibliography });
    setAlert(apiResponse.success ? "success" : "error", apiResponse.message);
  };

  const handleAutosaveContent = async (data: string) => {
    const apiResponse = await updateDraft(currentDraft?._id!, { content: data });
    if (apiResponse.success) {
      updateCurrentDraftObj({ content: apiResponse.data.draft?.content })
      setContentIsSaved(true)
    }
  }

  const handleAutosaveBibliography = async (data: string) => {
    const apiResponse = await updateDraft(currentDraft?._id!, {
      bibliography: data,
    });
    if (apiResponse.success) {
      updateCurrentDraftObj({
        bibliography: apiResponse.data.draft?.bibliography,
      });
      setBibliographyIsSaved(true);
    }
  };

  const handleNext = async () => {
    if (!content || !bibliography) return setAlert("warn", "All fields are required");

    if (!contentIsSaved || !bibliographyIsSaved) await saveData();
    handleNextStep();
  };

  const handlePrev = async () => {
    if (!contentIsSaved || !bibliographyIsSaved) await saveData();
    handlePrevStep();
  };

  const handleSetContentWords = (words: number) => {
    setContentWords(words)
  }

  const handleSetBibliographyWords = (words: number) => {
    setBibliographyWords(words);
  };

  return (
    <>
      <EditorContainer>
        <WriteGroup>
          <p>Escribe el contenido de tu articulo</p>

          <div className="c-editor__box">
            <Editor
              initialData={content}
              handleSetData={handleSetContent}
              setWordCount={handleSetContentWords}
              handleAutosave={handleAutosaveContent}
              draftId={currentDraft?._id!}
              token={token}
            />
          </div>

          <EditorState isSaved={contentIsSaved} wordsCount={contentWords}/>
        </WriteGroup>

        <WriteGroup>
          <p>
            Escribe la bibliografia de tu articulo
          </p>

          <div className="c-editor__box">
            <EditorSimple
              initialData={bibliography}
              handleSetData={handleSetBibliography}
              setWordCount={handleSetBibliographyWords}
              handleAutosave={handleAutosaveBibliography}
            />
          </div>

          <EditorState isSaved={bibliographyIsSaved} wordsCount={bibliographyWords}/>
        </WriteGroup>
      </EditorContainer>

      <WriteButtons handleNextStep={handleNext} handlePrevStep={handlePrev} />
    </>
  );
}

export default Content