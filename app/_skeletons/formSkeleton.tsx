import Image from 'next/image'

import largeLogo from "@/public/img/logos/long.svg";

import "@/styles/layout/form-section.scss";
import '@/styles/skeletons/form.scss'

const FormSkeleton = () => {
  return (
    <section className="l-form-section">
      <Image src={largeLogo} alt="Main logo" className="l-form-section__img" />

      <div className='s-form'></div>
    </section>
  )
}

export default FormSkeleton