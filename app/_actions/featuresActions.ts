"use server"

import { revalidateTag } from "next/cache"
import type { ApiErrorResponse, ApiSuccessResponse, ArticlePreview } from "../_interfaces/api"
import { checkCookieExist } from "./authActions"
import { getToken } from "./userActions"

export const checkAuthorFollow = async (authorId: string): Promise<boolean> => {
  if (!checkCookieExist()) return false;

  const response = await fetch(`${process.env.BACKEND_URL}/features/follow/${authorId}`, {
    headers: {
      "Authorization": `Bearer ${await getToken()}`
    },
    cache: 'no-cache'
  })

  const data: ApiSuccessResponse = await response.json()  

  return data.data?.follow! ?? false
}

export const checkArticleIsLiked = async (articleId: string): Promise<boolean> => {
  if (!checkCookieExist()) return false

  const response = await fetch(`${process.env.BACKEND_URL}/features/like/${articleId}`, {
    headers: {
      "Authorization": `Bearer ${await getToken()}`
    },
    cache: 'no-cache'
  })

  const data: ApiSuccessResponse = await response.json()  

  return data.data?.like! ?? false
}

export const getSavedArticles = async (): Promise<ArticlePreview[]> => {
  const response = await fetch(`${process.env.BACKEND_URL}/articles/saves`, {
    headers: {
      'Authorization': `Bearer ${await getToken()}`
    },
    next: {
      tags: ['saves']
    }
  })

  const data: ApiErrorResponse | ApiSuccessResponse = await response.json()

  if (!data.success) return []
  
  return data.data.articles!
}

export const getSavedArticlesId = async (): Promise<string[]> => {
  const response = await getSavedArticles()

  const ids = response?.map(save => save._id)

  return ids
}

export const saveArticle = async (articleId: string): Promise<ApiErrorResponse | ApiSuccessResponse> => {
  const response = await fetch(`${process.env.BACKEND_URL}/features/saveArticle/${articleId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${await getToken()}`,
    },
    cache: "no-cache",
  })

  const data: ApiSuccessResponse | ApiErrorResponse = await response.json()
  
  if(data.success) revalidateTag('saves')

  return data
}

export const unsaveArticle = async (articleId: string): Promise<ApiErrorResponse | ApiSuccessResponse> => {
  const response = await fetch(`${process.env.BACKEND_URL}/features/saveArticle/${articleId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${await getToken()}`,
    },
    cache: "no-cache",
  })

  const data: ApiSuccessResponse | ApiErrorResponse = await response.json()
  
  if(data.success) revalidateTag('saves')

  return data
}

export const followAuthor = async (authorId: string): Promise<ApiErrorResponse | ApiSuccessResponse> => {
  const response = await fetch(`${process.env.BACKEND_URL}/features/followAuthor/${authorId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${await getToken()}`,
    },
    cache: "no-cache",
  })

  const data: ApiSuccessResponse | ApiErrorResponse = await response.json()

  return data
}

export const unfollowAuthor = async (authorId: string): Promise<ApiErrorResponse | ApiSuccessResponse> => {
  const response = await fetch(`${process.env.BACKEND_URL}/features/followAuthor/${authorId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${await getToken()}`,
    },
    cache: "no-cache",
  })

  const data: ApiSuccessResponse | ApiErrorResponse = await response.json()

  return data
}

export const likeArticle = async (articleId: string): Promise<ApiErrorResponse | ApiSuccessResponse> => {
  const response = await fetch(`${process.env.BACKEND_URL}/features/likeArticle/${articleId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
      cache: "no-cache",
    }
  );

  const data: ApiSuccessResponse | ApiErrorResponse = await response.json();

  return data;
}

export const unlikeArticle = async (articleId: string): Promise<ApiErrorResponse | ApiSuccessResponse> => {
  const response = await fetch(`${process.env.BACKEND_URL}/features/likeArticle/${articleId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
      cache: "no-cache",
    }
  );

  const data: ApiSuccessResponse | ApiErrorResponse = await response.json();

  return data;
}