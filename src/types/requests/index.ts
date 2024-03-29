/** Request verb. */
export type ApiRequestVerb = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

/** Request query. */
export interface ApiRequestQuery {
  [key: string]:
    | ApiRequestQuery
    | null
    | boolean
    | string
    | number
    | Array<any>;
}

/** Request data. */
export interface ApiRequestData {
  [key: string]: ApiRequestData | null | boolean | string | number | Array<any>;
}

/** Request headers. */
export interface ApiRequestHeaders {
  [key: string]: string;
}

/** Request transformation to fecht API params. */
export interface ApiRequestToFetchParams {
  method: ApiRequestVerb;
  body?: string | FormData;
  headers?: ApiRequestHeaders;
  credentials?: "include";
}

/** Json representation of request (used for debug.) */
export interface ApiRequestAsJson {
  verb: ApiRequestVerb;
  baseUrl: string;
  url: string;
  url_with_query: string;
  query: ApiRequestQuery;
  headers: ApiRequestHeaders;
  data: ApiRequestData;
  usingCredentials: boolean;
  isUsingLaravel: boolean;
}
