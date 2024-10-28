export const createQueryString = (
    searchParams: URLSearchParams | undefined,
    name: string,
    value: string
): string => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set(name, value);
    return params.toString();
};