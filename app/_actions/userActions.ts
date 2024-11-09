"use server"
import { cookies } from 'next/headers'
import type { ApiErrorResponse, ApiSuccessResponse, LoggedUser, User, UserPreview, UserStats } from '../_interfaces/api'
import { revalidateTag } from 'next/cache'

const defaultStats: UserStats = {
  likes: 0,
  articles: 0,
  followers: 0,
};

export const getLoggedUser = async (): Promise<LoggedUser | null> => {
  "use server"
  const token = cookies().get('token_sciflutter')

  if(!token) return null

  const response = await fetch(`${process.env.BACKEND_URL}/users/me`, {
    // cache: 'no-store',
    headers: {
      "Authorization": `Bearer ${token.value}`
    },
    next: {
      tags: ['logged_user']
    }
  })

  const data: ApiErrorResponse | ApiSuccessResponse = await response.json()

  if (!data.success) {
    cookies().delete('token_sciflutter')

    return null
  }

  return (data.data.user as LoggedUser)
}

export const getUser = async (userId: string): Promise<{success: boolean, message: string, user?: User}> => {
  const response = await fetch(`${process.env.BACKEND_URL}/users/${userId}`, {next: {tags: ['users']}})
  const data: ApiErrorResponse | ApiSuccessResponse = await response.json()

  if (!data.success) return {
    success: false,
    message: "Usuario no encontrado"
  }

  return {
    success: true,
    message: data.message,
    user: data.data.user
  }
}

export const getSearchAuthors = async (search: string, queryString: string): Promise<UserPreview[]> => {
  const response = await fetch(`${process.env.BACKEND_URL}/users/authors?name=${search}${queryString}`, { next: { tags: ['authors_results'], revalidate: 60 } })
  const data: ApiErrorResponse | ApiSuccessResponse = await response.json()

  if (!data.success) return []

  return data.data.users!
}

export const getMoreAuthors = async (): Promise<UserPreview[]> => {
  const response = await fetch(`${process.env.BACKEND_URL}/users/authors?limit=4`, { next: { tags: ['more_authors'] } })
  const data: ApiErrorResponse | ApiSuccessResponse = await response.json()

  if (!data.success) return []

  return data.data.users!
}

export const getAuthorFilters = async (query: string) => {
  const response = await fetch(`${process.env.BACKEND_URL}/users/filters?name=${query}`, { next: { tags: ['authors_results'], revalidate: 60 } })
  const data = await response.json()

  if (!data.success) return []

  return data.data.disciplines!
}

export const getUserStats = async (userId: string): Promise<UserStats> => {
  const response = await fetch(`${process.env.BACKEND_URL}/users/${userId}/stats`, { next: { tags: ['users-stats'] } })
  const data: ApiSuccessResponse | ApiErrorResponse = await response.json()

  if (!data.success) return defaultStats
  
  return data.data.stats!
}

export const updateUserData = async (formData: FormData): Promise<{success: boolean, message: string, user?: LoggedUser}> => {
  const response = await fetch(`${process.env.BACKEND_URL}/users/me`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${await getToken()}`,
    },
    body: formData,
    cache: "no-cache",
  });

  const data: ApiErrorResponse | ApiSuccessResponse = await response.json();

  if (!data.success) return { success: data.success, message: data.message }
  
  revalidateTag('logged_user')

  return { success: data.success, message: data.message, user: (data.data.user as LoggedUser) }
}

export const deactivateAccount = async (password: string): Promise<ApiErrorResponse | ApiSuccessResponse> => {
  const formData = {
    password
  }

  const response = await fetch(`${process.env.BACKEND_URL}/users/me/deactivateAccount`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${await getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData)
  });

  const data: ApiErrorResponse | ApiSuccessResponse = await response.json();

  return data
}

export const deleteAccount = async (password: string): Promise<ApiErrorResponse | ApiSuccessResponse> => {
  const formData = {
    password,
  };

  const response = await fetch(
    `${process.env.BACKEND_URL}/users/me/`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${await getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );

  const data: ApiErrorResponse | ApiSuccessResponse = await response.json();

  return data;
}

export const changePassword = async (formData: { password: string, newPassword: string, newPasswordConfirm: string }): Promise<ApiErrorResponse | ApiSuccessResponse>  => {
  const response = await fetch(
    `${process.env.BACKEND_URL}/users/me/updatePassword`,
    {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      method: "PATCH",
    }
  );

  const data: ApiSuccessResponse | ApiErrorResponse = await response.json();

  return data
}

export const getToken = async (): Promise<string | null> => {
  const token = cookies().get("token_sciflutter");

  if (!token) return null;

  return token.value
}

export const revalidateUsers = async () => {
  revalidateTag('users')
}

export const revalidateLoggedUser = async () => {
  revalidateTag('logged-user')
}