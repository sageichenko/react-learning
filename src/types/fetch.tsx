type HeadersType = {[headerName: string]: string}
type ParamsType = {[paramName: string]: string}
type FetcherFunction<T> = (url: string) => Promise<T>;
type FetcherParameters = { headers?: HeadersType, params?: ParamsType, method: string };
type FetchMethodOptions = { headers?: HeadersType, body?: string, method: string };
type Fetcher<T> = FetcherFunction<T> | FetcherParameters
