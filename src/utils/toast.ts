"use client"
import { toast } from 'sonner';

const notifySuccess = (message: string) =>
  toast.success(message, {
    position: 'top-center',
  });

const notifyError = (message: string) =>
  toast.error(message, {
    position: 'top-center',
  });

export { notifySuccess, notifyError };

