// File: src/types/index.ts

import { ComponentType, ReactNode } from 'react';


export interface User {
  id: string;
  email: string | null;
  createdAt: string | null;
  role: string | null;
}


export interface IRoute {
  path: string;
  name: string;
  layout?: string;
  exact?: boolean;
  component?: ComponentType;
  disabled?: boolean;
  icon?: JSX.Element;
  secondary?: boolean;
  collapse?: boolean;
  items?: IRoute[];
  rightElement?: boolean;
  invisible?: boolean;
  adminOnly?: boolean;
}

