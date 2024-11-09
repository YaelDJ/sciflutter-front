"use server"

import { revalidatePath} from "next/cache";
import { ApiErrorResponse, ApiSuccessResponse, Draft, DraftPreview } from "../_interfaces/api";
import { getToken } from "./userActions";
import type { NewData } from "../_interfaces/draftController";

export const getDrafts = async (): Promise<DraftPreview[]> => {
  const response = await fetch(`${process.env.BACKEND_URL}/articles/drafts`, {
    headers: {
      Authorization: `Bearer ${await getToken()}`,
    },
    cache: "no-cache"
  });

  const data: ApiErrorResponse | ApiSuccessResponse = await response.json();

  if (!data.success) return [];

  return data.data.drafts!
}

export const getOneDraft = async (draftId: string): Promise<Draft | null> => {
  const response = await fetch(`${process.env.BACKEND_URL}/articles/drafts/${draftId}`, {
    headers: {
      Authorization: `Bearer ${await getToken()}`,
    },
    cache: "no-store",
    next: {
      tags: ['drafts'],
    }
  });

  const data: ApiErrorResponse | ApiSuccessResponse = await response.json();

  if (!data.success) return null;

  return data.data.draft!
}

export const deleteDraft = async ( draftId: string ): Promise<ApiErrorResponse | ApiSuccessResponse> => {
  const response = await fetch(`${process.env.BACKEND_URL}/articles/drafts/${draftId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${await getToken()}`
    }
  });

  const data: ApiErrorResponse | ApiSuccessResponse = await response.json();

  if(data.success) revalidatePath('/drafts', 'page')

  return data;
};

export const copyDraft = async (draftId: string): Promise<ApiErrorResponse | ApiSuccessResponse> => {
  const response = await fetch(`${process.env.BACKEND_URL}/articles/copyDraft/${draftId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${await getToken()}`
    }
  })

  const data: ApiErrorResponse | ApiSuccessResponse = await response.json();

  if(data.success) revalidatePath('/drafts', 'page')

  return data
}

export const publishDraft = async (draftId: string): Promise<ApiErrorResponse | ApiSuccessResponse> => {
  const response = await fetch(`${process.env.BACKEND_URL}/articles/publishDraft/${draftId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${await getToken()}`
    }
  })

  const data = await response.json();

  return data
}

export const createDraft = async (baseDraft: { name: string,  discipline: string, resume: string }) => {
  const response = await fetch(`${process.env.BACKEND_URL}/articles/drafts/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${await getToken()}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(baseDraft)
  })

  const data: ApiSuccessResponse | ApiErrorResponse = await response.json()

  return data
}

export const updateDraft = async (draftId: string, newData: NewData) => {
  const response = await fetch(`${process.env.BACKEND_URL}/articles/drafts/${draftId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${await getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
    cache: 'no-store'
  });

  const data: ApiSuccessResponse | ApiErrorResponse = await response.json();

  return data;
}

export const uploadDraftImg = async (draftId: string, formData: FormData): Promise<ApiErrorResponse | ApiSuccessResponse> => {
  const response = await fetch(`${process.env.BACKEND_URL}/articles/drafts/${draftId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${await getToken()}`
    },
    body: formData,
    cache: 'no-cache'
  })

  revalidatePath('/drafts', 'page')

  const data = await response.json();

  return data
}
