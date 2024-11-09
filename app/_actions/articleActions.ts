"use server"

import { revalidatePath } from "next/cache"
import type { ApiErrorResponse, ApiSuccessResponse, Article, ArticlePreview } from "../_interfaces/api"
import { getToken } from "./userActions"

const REVALIDATE_TIME = 60 * 5

export const getArticlesOfAuthor = async (authorId: string): Promise<ArticlePreview[]> => {
  const response = await fetch(`${process.env.BACKEND_URL}/articles/?author=${authorId}`, { next: { revalidate: REVALIDATE_TIME } })
  const data: ApiErrorResponse | ApiSuccessResponse = await response.json()

  if(!data.success) return []

  return data.data.articles!
}

export const getArticle = async (articleId: string): Promise<Article | null> => {
  const response = await fetch(`${process.env.BACKEND_URL}/articles/${articleId}`, {next: {tags: ["articles"]}})
  const data: ApiErrorResponse | ApiSuccessResponse = await response.json()

  if(!data.success) return null

  return data.data.article!
}

export const getRequestedArticle = async (articleId: string): Promise<Article | null> => {
  const response = await fetch(`${process.env.BACKEND_URL}/articles/${articleId}/requested`, {
    next: {
      tags: ["articles"]
    },
    headers: {
      Authorization: `Bearer ${await getToken()}`
    }
  })
  const data: ApiErrorResponse | ApiSuccessResponse = await response.json()

  if(!data.success) return null

  return data.data.article!
}

export const getMyArticles = async (): Promise<ArticlePreview[]> => {
  const response = await fetch(`${process.env.BACKEND_URL}/articles/myArticles`, {
    headers: {
      Authorization: `Bearer ${await getToken()}`,
    }
  });

  const data: ApiErrorResponse | ApiSuccessResponse = await response.json();

  if (!data.success) return [];

  return data.data.articles!;
}

export const deleteArticle = async (articleId: string): Promise<ApiErrorResponse | ApiSuccessResponse> => {
  const response = await fetch(`${process.env.BACKEND_URL}/articles/${articleId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${await getToken()}`
    }
  });

  const data: ApiErrorResponse | ApiSuccessResponse = await response.json();

  if(data.success) revalidatePath('/drafts', 'page')

  return data;
}

const LIMITARTICLES = 5

export const getSearchArticles = async (search: string, queryString: string): Promise<{ articles: ArticlePreview[], totalPages: number }> => {
  const response = await fetch(`${process.env.BACKEND_URL}/articles?limit=${LIMITARTICLES}&name=${search}${queryString}`, { next: { tags: ['articles_results'], revalidate: 60 } })
  const data: ApiErrorResponse | ApiSuccessResponse = await response.json()

  if (!data.success) return { articles: [], totalPages: 0 }

  return {articles: data.data.articles!, totalPages: data.pages!}
}

export const getMoreArticles = async (): Promise<ArticlePreview[]> => {
  const response = await fetch(`${process.env.BACKEND_URL}/articles?limit=3`, { next: { tags: ['more_articles'], revalidate: 300 } })
  const data: ApiErrorResponse | ApiSuccessResponse = await response.json()

  if (!data.success) return []

  return data.data.articles!
}

export const getArticleFilters = async(query: string) => {
  const response = await fetch(`${process.env.BACKEND_URL}/articles/filters?name=${query}`, { next: { tags: ['filters'], revalidate: 60 } })
  const data = await response.json()

  console.log(data);
  
  if (!data.success) return { disciplines: [], years: [] }

  return data.data.filters!
}