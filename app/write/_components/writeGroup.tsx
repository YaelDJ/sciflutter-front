import { BaseComponent } from "@/app/_interfaces/components";
import { type FC } from "react"

import '@/styles/components/write-group.scss'

const WriteGroup: FC<BaseComponent> = ({ children }) => {
  return (
    <div className="c-write-group">
      {children}
    </div>
  );
}

export default WriteGroup