"use server"
import { revalidatePath, revalidateTag } from "next/cache";
import { ApiErrorResponse, ApiSuccessResponse, Request } from "../_interfaces/api";
import { getToken } from "./userActions";

const SEARCHLIMIT = 10

export const getRequests = async (page: string, query: string): Promise<{ requests: Request[], totalPages: number }> => {
  const response = await fetch(`${process.env.BACKEND_URL}/requests?limit=${SEARCHLIMIT}&page=${page}${query}`, {
    headers: {
      Authorization: `Bearer ${await getToken()}`,
    },
    next: {
      tags: ["requests"]
    }
  });

  const data = await response.json();

  if (!data.success) return { requests: [], totalPages: 0 };

  return { requests: data.data.requests!, totalPages: data.pages };
}

export const getRequestById = async (id: string): Promise<Request[]> => {
  const response = await fetch(`${process.env.BACKEND_URL}/requests/${id}`, {
    headers: {
      Authorization: `Bearer ${await getToken()}`,
    },
    next: {
      tags: ["requests"]
    },
  });

  const data = await response.json();

  if (!data.success) return [];

  return [data.data.request!]
}

export const approvePublish = async (id: string, formData: { article: string, draft: string }): Promise<{ message: string, success: boolean }> => {
  const response = await fetch(`${process.env.BACKEND_URL}/requests/${id}/approve-publish`, {
    headers: {
      Authorization: `Bearer ${await getToken()}`,
      "Content-Type": "application/json"
    },
    method: 'PATCH',
    next: {
      tags: ["requests"],
      revalidate: 0
    },
    body: JSON.stringify(formData)
  });

  const data: ApiErrorResponse | ApiSuccessResponse = await response.json();

  revalidatePath('/requests', 'page')
  revalidateTag('requests')

  return { message: data.message, success: data.success }
}

export const rejectPublish = async (id: string, formData: { article: string, draft: string }): Promise<{ message: string, success: boolean }> => {
  const response = await fetch(`${process.env.BACKEND_URL}/requests/${id}/reject-publish`, {
    headers: {
      Authorization: `Bearer ${await getToken()}`,
      "Content-Type": "application/json"
    },
    method: 'PATCH',
    next: {
      tags: ["requests"],
      revalidate: 0
    },
    body: JSON.stringify(formData)
  });

  const data: ApiErrorResponse | ApiSuccessResponse = await response.json();

  revalidatePath('/requests', 'page')
  revalidateTag("requests");

  return { message: data.message, success: data.success }
}