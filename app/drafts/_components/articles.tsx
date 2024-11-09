import { getMyArticles } from "@/app/_actions/articleActions";
import dynamic from "next/dynamic";

const ArticlesList = dynamic(() => import('./articlesList'))

const Articles: React.FC = async () => {
  const myArticles = await getMyArticles();

  return (
    <ArticlesList myArticles={myArticles}/>
  );
}

export default Articles