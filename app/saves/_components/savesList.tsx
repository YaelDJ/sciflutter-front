import { getSavedArticles } from "@/app/_actions/featuresActions"
import ArticlePreviewList from "@/app/_components/articlePreviewList"

const SavesList = async () => {
  const savedArticles  = await getSavedArticles()

  return (
    <ArticlePreviewList articleList={savedArticles} emptyMessage="Aun no hay articulos guardados"/>
  );
}

export default SavesList