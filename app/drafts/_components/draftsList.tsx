"use client"
import dynamic from "next/dynamic";
import { useState } from "react";

import type { DraftPreview } from "@/app/_interfaces/api";

import { copyDraft, deleteDraft } from "@/app/_actions/draftsActions";

import { useAlertContext } from "@/app/_context/alertContext";

import CardsList from "@/app/_components/cardsList";
import Message from "@/app/_components/message";

import { TrashSimple } from "@phosphor-icons/react/dist/ssr/TrashSimple";
import { CopySimple } from "@phosphor-icons/react/dist/ssr/CopySimple";

import ArticlePreviewSkeleton from "@/app/_skeletons/articlePreviewSkeleton";

import ConfirmDelete from "./confirmDelete";

import '@/styles/components/my-article.scss'

const DynamicDraftPreview = dynamic(() => import("@/app/_components/draftPreview"), { loading: () => <ArticlePreviewSkeleton />, ssr: false });

const DynamicModalWindow = dynamic(() => import('@/app/_components/modalWindow'), { ssr: false })

interface Props{
  myDrafts: DraftPreview[]
}

const DraftsList: React.FC<Props> = ({ myDrafts }) => {
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState<boolean>(false)
  const [selectedDraft, setSelectedDraft] = useState<string>('')

  const { setAlert } = useAlertContext(state => state);

  const handleDeleteDraft = async () => {
    const response = await deleteDraft(selectedDraft)

    setAlert(response.success ? "success" : "error", response.message);
    
    setConfirmDeleteOpen(false)
  }

  const handleCancel = () => {
    setConfirmDeleteOpen(false)
    setSelectedDraft('')
  }

  const handleCopyDraft = async (draftId: string) => {
    const response = await copyDraft(draftId)

    setAlert(response.success ? 'success' : 'error', response.message)
  }

  return (
    <>
      <CardsList type="articles">
        {!myDrafts.length && <Message message="Aun no hay borradores" />}

        {myDrafts.length > 0 &&
          myDrafts.map((draft: DraftPreview) => (
            <div className="c-my-article" key={draft._id}>
              <DynamicDraftPreview draft={draft} />

              <div className="c-my-article__options">
                <button
                  className="c-my-article__btn_delete"
                  onClick={() => {
                    setSelectedDraft(draft._id);
                    setConfirmDeleteOpen(true);
                  }}
                >
                  <TrashSimple size={32} />
                </button>

                <button
                  className="c-my-article__btn"
                  onClick={() => {
                    handleCopyDraft(draft._id);
                  }}
                >
                  <CopySimple size={32} />
                </button>
              </div>
            </div>
          ))}
      </CardsList>

      {myDrafts.length > 0 && (
        <DynamicModalWindow
          isModalOpen={confirmDeleteOpen}
          onClickOverlay={handleCancel}
        >
          <ConfirmDelete
            title="Confirm delete draft"
            onCancel={handleCancel}
            onClick={handleDeleteDraft}
          >
            <p>
              Remember that once deleted, you cannot recover the draft. Keep in
              mind that all the pictures submited while the draft edition will
              also be deleted.
            </p>
          </ConfirmDelete>
        </DynamicModalWindow>
      )}
    </>
  );
}

export default DraftsList