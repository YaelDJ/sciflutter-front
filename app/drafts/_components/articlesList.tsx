'use client'
import { useState } from "react";
import dynamic from "next/dynamic"

import { deleteArticle } from "@/app/_actions/articleActions";

import type { ArticlePreview } from "@/app/_interfaces/api";

import { TrashSimple } from "@phosphor-icons/react/dist/ssr/TrashSimple";

import CardsList from "@/app/_components/cardsList";
import Message from "@/app/_components/message";
import ConfirmDelete from "./confirmDelete";

import ArticlePreviewSkeleton from "@/app/_skeletons/articlePreviewSkeleton";

import '@/styles/components/my-article.scss'
import { useAlertContext } from "@/app/_context/alertContext";

const DynamicArticlePreview = dynamic(() => import("@/app/_components/articlePreview"), { loading: () => <ArticlePreviewSkeleton />, ssr: false });

const DynamicModalWindow = dynamic(() => import('@/app/_components/modalWindow'), { ssr: false })

interface Props{
  myArticles: ArticlePreview[]
}

const ArticlesList: React.FC<Props> = ({ myArticles }) => {
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState<boolean>(false);
  const [selectedArticle, setSelectedArticle] = useState<string>("");

  const { setAlert } = useAlertContext(state => state);

  const handleDeleteDraft = async () => {
    const response = await deleteArticle(selectedArticle);

    setAlert(response.success ? "success" : "error", response.message);
    setConfirmDeleteOpen(false);
  };

  const handleCancel = () => {
    setConfirmDeleteOpen(false);
    setSelectedArticle("");
  };

  return (
    <>
      <CardsList type="articles">
        {!myArticles.length && <Message message="No articles published yet" />}

        {myArticles.length > 0 &&
          myArticles.map((article: ArticlePreview) => (
            <div key={article._id} className="c-my-article">
              <DynamicArticlePreview article={article} />

              <div className="c-my-article__options">
                <button
                  className="c-my-article__btn_delete"
                  onClick={() => {
                    setSelectedArticle(article._id)
                    setConfirmDeleteOpen(true)
                  }}
                >
                  <TrashSimple size={32} />
                </button>
              </div>
            </div>
          ))}
      </CardsList>

      {myArticles.length > 0 && (
        <DynamicModalWindow
          isModalOpen={confirmDeleteOpen}
          onClickOverlay={handleCancel}
        >
          <ConfirmDelete
            title="Confirm delete draft"
            onCancel={handleCancel}
            onClick={handleDeleteDraft}
          >
            <p>Remember that once deleted, you cannot recover your article. Keep in mind that all the pictures in the article will also be deleted.</p>
          </ConfirmDelete>
        </DynamicModalWindow>
      )}
    </>
  );
}

export default ArticlesList