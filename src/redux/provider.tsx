"use client";

import { store } from "./store";
import { Provider } from "react-redux";
import AuthCom from "@/app/components/auth/auth-com";
import { Toaster } from 'sonner';
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Provider store={store}>
        <AuthCom>{children}</AuthCom>
        <Toaster />
      </Provider>
    </>
  );
}
