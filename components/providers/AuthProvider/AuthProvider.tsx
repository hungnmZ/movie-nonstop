import * as React from 'react';
import { ClerkProvider } from '@clerk/nextjs';

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  return <ClerkProvider>{children}</ClerkProvider>;
};

export default AuthProvider;
