declare type QueryOptions<T> = Omit<
    import('@tanstack/react-query').UseQueryOptions<T>,
    'queryKey' | 'queryFn'
>;

declare type MutationOptions<TData, TDto = void> = Omit<
    import('@tanstack/react-query').UseMutationOptions<TData, any, TDto>,
    'mutationKey' | 'mutationFn'
>;
