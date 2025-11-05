import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { trpc } from '../trpc';

export function useAuthRedirect(requireAuthenticated = true) {
  const navigate = useNavigate();
  const location = useLocation();
  const meQuery = trpc.auth.me.useQuery(undefined, {
    retry: false,
    staleTime: 30_000,
  });

  useEffect(() => {
    if (!requireAuthenticated) {
      return;
    }

    if (meQuery.status === 'loading') {
      return;
    }

    if (meQuery.data?.user) {
      return;
    }

    navigate('/login', {
      replace: true,
      state: {
        from: location.pathname + location.search,
      },
    });
  }, [meQuery.status, meQuery.data, navigate, location, requireAuthenticated]);

  return {
    user: meQuery.data?.user ?? null,
    isLoading: meQuery.isLoading,
    error: meQuery.error ?? null,
  };
}
