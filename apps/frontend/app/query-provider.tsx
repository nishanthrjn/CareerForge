// This is a client component that gives all children access to React Query (useQuery, useMutation, useQueryClient, etc.).

'use client';

import { ReactNode, useState } from 'react';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

type Props = {
  children: ReactNode;
};

export function QueryProvider({ children }: Props) {
  // Create the client once per app instance
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
