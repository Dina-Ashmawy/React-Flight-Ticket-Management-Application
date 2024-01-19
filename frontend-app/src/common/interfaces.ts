import { ReactNode } from "react";


export interface ErrorDescription {
  statusText?: string;
  message?: string;
}


export interface LoadingProps {
  loading: boolean;
  error: string | null;
  children?: ReactNode;
}
