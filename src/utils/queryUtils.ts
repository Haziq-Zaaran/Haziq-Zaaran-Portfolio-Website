
import { QueryClient } from "@tanstack/react-query";

/**
 * React Query V5+ Migration Guide:
 * 
 * 'cacheTime' has been renamed to 'gcTime' in React Query v5+.
 * 
 * gcTime (garbage collection time) controls how long React Query will keep
 * unused/inactive data in the cache before it's garbage collected.
 * 
 * Example usage:
 * 
 * ```
 * const { data } = useQuery({
 *   queryKey: ['todos'],
 *   queryFn: fetchTodos,
 *   gcTime: 5 * 60 * 1000, // 5 minutes
 * })
 * ```
 */

/**
 * Creates a configured QueryClient with appropriate cache settings
 * @param options Additional configuration options
 * @returns Configured QueryClient instance
 */
export const createConfiguredQueryClient = (options?: {
  defaultGcTime?: number;
  defaultStaleTime?: number;
  defaultRetryCount?: number;
}) => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: options?.defaultRetryCount ?? 1,
        refetchOnWindowFocus: false,
        staleTime: options?.defaultStaleTime ?? 5 * 60 * 1000, // Default: 5 minutes
        gcTime: options?.defaultGcTime ?? 10 * 60 * 1000,      // Default: 10 minutes
      },
    },
  });
};

/**
 * Reference for React Query v4 to v5 migration changes
 * 
 * - cacheTime → gcTime
 * - useQuery({ onSuccess: fn }) → useQuery({ meta: { onSuccess: fn } })
 * - useQuery({ onError: fn }) → useQuery({ meta: { onError: fn } })
 * - query.remove() → queryClient.removeQueries()
 */
