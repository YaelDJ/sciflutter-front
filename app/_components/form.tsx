"use client"
import { type FC, createContext, useContext, useEffect } from "react"
import { useFormState, useFormStatus } from "react-dom"
import clsx from "clsx"

import { useShallow } from "zustand/react/shallow"
import { permanentRedirect } from "next/navigation"

import Image from "next/image";

import type { ContextValue, FormHOCProps, HeaderProps } from "../_interfaces/formCompound"
import type { BaseComponent } from "../_interfaces/components"

import largeLogo from "@/public/img/logos/long-dark.svg";
import "@/styles/layout/form-section.scss";
import "@/styles/components/form.scss";
import { useAlertContext } from "../_context/alertContext"
import { useUserContext } from "../_context/userContext"


const FormContext = createContext<ContextValue>({})

const initialState = {
  success: false,
  message: ""
}

export const FormHOC: FC<FormHOCProps>= ({ children, serverAction }) => {
  const [state, formAction] = useFormState(serverAction, initialState)
  const setUser = useUserContext(useShallow(state => state.updateUser));
  const setAlert = useAlertContext(useShallow(state => state.setAlert));
  const { user } = useUserContext(state => state);

  useEffect(() => {
    if(!state.success) return setAlert('error', state.message!)

    if (state.success && state.user) {
      setUser(state.user);
      setAlert('success', state.message!);
    }

    
    if (user) {
      permanentRedirect("/");
    }
  }, [state, setUser, user, setAlert]);

  return (
    <FormContext.Provider value={{ formAction, message: state.message, success: state.success }}>
      <section className="l-form-section">
        <Image src={largeLogo} alt="Main logo" className="l-form-section__img" />
        
        {children}
      </section>
    </FormContext.Provider>
  );
}

export const FormContainer: FC<BaseComponent> = ({children}) => {
  return (
    <div className="c-form">
      {children}
    </div>
  )
}

export const Header: FC<HeaderProps> = ({ description, title }) => {
  return (
    <div className="c-form-header">
      <h2 className="c-form-header__heading">{title}</h2>
      <p>
        {description}
      </p>
    </div>
  );
}

export const Form: FC<BaseComponent> = ({ children }) => {
  const {formAction} = useContext(FormContext)

  return (
    <form className="c-form-formulary" action={formAction}>
      {children}
    </form>
  );
}

export const MoreOptions: FC<BaseComponent> = ({ children }) => {
  return (
    <div className="l-form-section__links">
      {children}
    </div>
  );
}

export const Link: FC<BaseComponent> = ({ children }) => {
  return (
    <p className="l-form-section__link">
      {children}
    </p>
  )
}

export const SubmitButton: FC<BaseComponent> = ({children}) => {
  const { pending } = useFormStatus()

  return (
    <button
      className={clsx(
        "c-form-formulary__button",
        pending && "is-pending"
      )}
    >
      {pending ? "Verifying..." : children}
    </button>
  );
}

export const FormGroup: FC<BaseComponent> = ({ children }) => {
  return <div className="c-form-formulary__group">{children}</div>;
}