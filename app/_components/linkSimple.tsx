import '@/styles/components/link-simple.scss'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr/ArrowRight'
import Link from 'next/link'

interface Props{
  href: string,
  children: React.ReactNode,
  target?: string
}

const LinkSimple: React.FC<Props> = ({ href, children, target = '_self' }) => {
  return (
    <Link href={href} className="c-link-simple" target={target}>
      {children}
      <ArrowRight size={32} weight="thin" className="c-link-simple__icon" />
    </Link>
  );
}

export default LinkSimple