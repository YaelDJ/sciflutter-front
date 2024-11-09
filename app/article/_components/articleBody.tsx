import { BaseComponent } from "@/app/_interfaces/components"
import ArticleSection from "./articleSection"

const ArticleBody: React.FC<BaseComponent> = ({children}) => {
  return (
    <main className="l-article__body">
      <ArticleSection>
        {children}
      </ArticleSection>
    </main>
  )
}

export default ArticleBody