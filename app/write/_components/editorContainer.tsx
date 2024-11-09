import { type FC } from 'react'
import type { BaseComponent } from '@/app/_interfaces/components'

import '@/styles/layout/editor.scss'

const EditorContainer: FC<BaseComponent> = ({ children }) => {
  return (
    <div className='l-editor'>{children}</div>
  )
}

export default EditorContainer