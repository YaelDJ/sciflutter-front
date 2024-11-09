import '@/styles/components/article-section.scss'

interface Props{
  children: React.ReactNode,
}

const ArticleSection: React.FC<Props> = ({ children }) => {
  return (
    <section className='article-section'>{children}</section>
  )
}

export default ArticleSection