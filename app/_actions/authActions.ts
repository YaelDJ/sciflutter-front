"use server"

import { cookies } from "next/headers"
import Cookies from "js-cookie";
import type { FormState } from "../_interfaces/formState"
import type { ApiErrorResponse, ApiResponseBase, ApiSuccessResponse, LoggedUser } from "../_interfaces/api";
import { revalidateTag } from "next/cache";

export const signup = async (prevState: FormState, formData: FormData): Promise<FormState> => {
  const response = await fetch(`${process.env.BACKEND_URL}/users/signup`, {
    method: "POST",
    body: formData
  });

  const data: ApiErrorResponse | ApiSuccessResponse = await response.json();

  if (data.success && data.token) {
    const cookieOptions = {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      samesite: null,
    };

    cookies().set("token_sciflutter", data.token, cookieOptions);
    return {
      success: data.success,
      user: data.data.user as LoggedUser,
    };
  } else {
    return {
      success: data.success,
      message: data.message,
    };
  }
}

export const login = async (prevState: FormState, formData: FormData): Promise<FormState> => {
  const response = await fetch(`${process.env.BACKEND_URL}/users/login`, {
    method: "POST",
    body: formData,
    cache: 'no-store'
  });

  const data: ApiErrorResponse | ApiSuccessResponse = await response.json();

  if (data.success && data.token) {
    const cookieOptions = {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      samesite: true
    };

    cookies().set("token_sciflutter", data.token, cookieOptions);

    if ((data.data.user as LoggedUser).isAdmin) cookies().set("sciflutter_admin", data.data.user?._id!, cookieOptions);

    return {
      success: data.success,
      user: (data.data.user as LoggedUser),
      message: data.message
    }
  } else { 
    return {
      success: data.success,
      message: data.message
    };
  }
}

export const requestResetPassword = async (prevState: FormState, formData: FormData): Promise<FormState> => {
  const response = await fetch(`${process.env.BACKEND_URL}/users/forgotPassword`, {
    method: 'POST',
    body: formData,
    cache: 'no-cache'
  })

  const data: ApiErrorResponse | ApiSuccessResponse = await response.json()

  return {
    success: data.success,
    message: data.message
  }
}

export const resetPassword = async (prevState: FormState, formData: FormData): Promise<FormState> => {
  const response = await fetch(`${process.env.BACKEND_URL}/users/resetPassword/${formData.get('token')}`, {
    method: 'PATCH',
    body: formData,
    cache: 'no-cache'
  })

  const data: ApiErrorResponse | ApiSuccessResponse = await response.json()

  return {
    success: data.success,
    message: data.message
  }
}

export const confirmAccount = async (token: string): Promise<ApiErrorResponse | ApiResponseBase> => {
  const response = await fetch(`${process.env.BACKEND_URL}/users/confirm/${token}`, { cache: "no-cache", method: 'PATCH' });

  return await response.json()
}

export const checkCookieExist = async (): Promise<boolean> => {
  const token = cookies().get('token_sciflutter')

  return Boolean(token)
}

export const checkAdminCookieExist = (): boolean => {
  const token = cookies().get('sciflutter_admin')

  return Boolean(token)
}

export const setCookieToken = (token: string): void => {
  const cookieOptions = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    samesite: null,
  };

  cookies().set('token_sciflutter', token, cookieOptions)
}

export const signout = (): void => {
  if(cookies().has('sciflutter_admin')) cookies().delete("sciflutter_admin");
  cookies().delete('token_sciflutter')
  revalidateTag('saves')
  revalidateTag('loggedUser')
}

export const getTokenClient = (): string | null => {
  const token = Cookies.get('token_sciflutter')

  if (!token) return null

  return token
}