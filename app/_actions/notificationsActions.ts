"use server"

import { ApiErrorResponse, ApiSuccessResponse, Notification } from "../_interfaces/api";
import { getToken } from "./userActions";

export const getMyNotifications = async (): Promise<Notification[]> => {
  const response = await fetch(`${process.env.BACKEND_URL}/notifications/`, {
    headers: {
      Authorization: `Bearer ${await getToken()}`,
    },
    cache: "no-cache",
  });

  const data: ApiSuccessResponse | ApiErrorResponse = await response.json();

  if (!data.success) return []

  return data.data.notifications!
}

export const readNotifications = async () => {
  const response = await fetch(`${process.env.BACKEND_URL}/notifications/`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${await getToken()}`,
    },
    cache: "no-cache",
  });

  const data: ApiSuccessResponse | ApiErrorResponse = await response.json();

  if (!data.success) return false

  return true
}

export const clearNotifications = async () => {
  const response = await fetch(`${process.env.BACKEND_URL}/notifications/`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${await getToken()}`,
    },
    cache: "no-cache",
  });

  const data: ApiSuccessResponse | ApiErrorResponse = await response.json();

  if (!data.success) return false

  return true
}
