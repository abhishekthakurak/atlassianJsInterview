type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';
interface Body {
    [key: string]: string | number | boolean | Body;
}
type RequestHeaders = Record<string, string | number | boolean>;
interface RequestOptions {
    method?: Method;
    body?: Body;
    headers?: RequestHeaders;
}
type Response<T = {}> = {
    status: number;
    response: T;
};
type ErrorResponse = {
    status: number;
    errorMessage: string;
};
type Result = Response | ErrorResponse;
type Handler = (request: RequestOptions) => Result;
interface Route {
    path: string;
    method: Method;
    handler: Handler;
}
declare class SimpleFetch {
    constructor(routes: Route[]);
    static makeFetch(routes: Route[]): <ResponseType_1 = {}>(path: string, options?: RequestOptions) => Promise<Response<ResponseType_1>>;
    fetch: <ResponseType_1 = {}>(path: string, options?: RequestOptions) => Promise<Response<ResponseType_1>>;
}
type Fetch = ReturnType<typeof SimpleFetch.makeFetch>;
declare global {
    var simpleFetch: Fetch;
}
export const simpleFetch: Fetch;
