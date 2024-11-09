import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { type Draft } from '@/app/_interfaces/api';

import { createDraft, updateDraft } from '@/app/_actions/draftsActions';

import { useAlertContext } from '@/app/_context/alertContext';
import { useUserContext } from '@/app/_context/userContext';

import { useCurrentDraft } from './stepController';
import WriteButtons from './writeButtons';
import WriteGroup from './writeGroup';

import '@/styles/components/editor.scss'
import EditorContainer from './editorContainer';

const SetBaseArticle = () => {
  const { currentDraft, updateCurrentDraftObj, handleNextStep, handlePrevStep } = useCurrentDraft()
  const { setAlert } = useAlertContext(state => state)
  const { user } = useUserContext(state => state)

  const [name, setName] = useState(currentDraft?.name ?? '')
  const [discipline, setDiscipline] = useState(currentDraft?.discipline ?? '')
  const [resume, setResume] = useState(currentDraft?.resume ?? '')

  const id = currentDraft?._id ?? null;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();

  const handleNext = async () => {
    // Verify inputs
    if ([name, resume].includes('')) return setAlert('warn', 'All fields are required')

    if(!discipline && !user?.discipline) return setAlert('warn', 'A discipline is required')

    let draft: Draft | null;
    let apiResponse;
    const newData = {
      name, 
      discipline: discipline ?? user?.discipline,
      resume
    }

    if (!id) {
      // If there is no id, create a new draft
      apiResponse = await createDraft(newData)
      const params = new URLSearchParams(searchParams);

      if (apiResponse.success) { 
        params.set("draftId", apiResponse.data.draft!._id);
        
        push(`${pathname}?${params.toString()}`, { scroll: false });
      } else {
        setAlert('error', apiResponse.message)
        return 
      }
    } else {
      // Se actualizara el borrador
      apiResponse = await updateDraft(id, newData)
    }

    // Se actualiza el borrador actual y se pasa al siguiente paso
    if (apiResponse.success) draft = apiResponse.data.draft!;
    else draft = null;

    updateCurrentDraftObj({ ...draft });

    setAlert(apiResponse.success ? 'success' : 'error', apiResponse.message);
    handleNextStep()
  }

  return (
    <>
      <EditorContainer>
        <WriteGroup>
          <label htmlFor="draft-name">Introduce the draft name</label>
          <input
            type="text"
            id="draft-name"
            className="is-lg"
            required
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </WriteGroup>

        <WriteGroup>
          <label htmlFor="draft-discipline">Select a discipline</label>
          <input
            type="text"
            id="draft-discipline"
            className="is-md"
            required
            name="discipline"
            value={discipline}
            onChange={(e) => setDiscipline(e.target.value)}
          />
        </WriteGroup>

        <WriteGroup>
          <label htmlFor="draft-resume">
            Write an article resume for the preview card
          </label>
          <textarea
            name="resume"
            id="draft-resume"
            cols={30}
            rows={5}
            className="text is-base"
            required
            value={resume}
            onChange={(e) => setResume(e.target.value)}
          ></textarea>
        </WriteGroup>
      </EditorContainer>

      <WriteButtons
        handleNextStep={handleNext}
        handlePrevStep={handlePrevStep}
      />
    </>
  );
}

export default SetBaseArticle