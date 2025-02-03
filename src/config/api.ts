import type {
    AxiosHeaderValue,
    AxiosInstance,
    AxiosResponse,
    // InternalAxiosRequestConfig,
} from 'axios';
import axios, { HttpStatusCode } from 'axios';
// import { jwtDecode } from 'jwt-decode';

enum ContentType {
    json = 'application/json',
    binary = 'application/octet-stream',
}

interface ApiOptions {
    xApiKey: string;
    baseUrl: string;
}

interface ApiHeaderOptions {
    token?: string;
    contentType?: ContentType;
    workspace?: string;
}

interface ApiRequestOptions {
    queries?: Record<string, string>;
    token?: string;
    signal?: AbortController;
    workspace?: string;
}

interface ApiPagination {
    page: number;
    perPage: number;
    orderBy: string;
    orderDirection: string;
    search?: string;
}

interface ApiMetadataResponse {
    languages: string[];
    timestamp: number;
    timezone: string;
    path: string;
    version: string;
    repoVersion: string;
}

interface ApiResponse<T = Record<string, any>> {
    statusCode: number;
    message: string;
    _metadata: ApiMetadataResponse;
    data?: T;
}

interface ApiPaginationMetadataResponse {
    search?: string;
    filter?: Record<string, string>;
    page: number;
    perPage: number;
    orderBy: string;
    orderDirection: string;
    availableSearch: string[];
    availableOrderBy: string[];
    availableOrderDirection: string[];
    total: number;
    totalPage: number;
}

interface ApiPaginationResponse<T = Record<string, any>>
    extends Omit<ApiResponse<T>, '_metadata' | 'data'> {
    _metadata: ApiPaginationMetadataResponse;
    data: T[];
}

interface ApiErrorResponse extends ApiResponse {}

export default class Api {
    private readonly maxRedirects: number = 3;

    private readonly defaultLanguage: string = 'en';

    private readonly requestTimeout: number = 30000; // 30s, in ms

    private readonly defaultHeaders: Record<string, AxiosHeaderValue> = {
        'Content-Type': ContentType.json,
        'x-custom-lang': this.defaultLanguage,
    };

    private readonly api: AxiosInstance;

    private readonly baseUrl: string;

    private readonly xApiKey: string;

    constructor(options: ApiOptions) {
        this.baseUrl = options.baseUrl;
        this.xApiKey = options.xApiKey;

        const headers = this.setHeaders();
        this.api = axios.create({
            timeout: this.requestTimeout,
            baseURL: this.baseUrl,
            maxRedirects: this.maxRedirects,
            headers,
        });

        this.setInterceptor();
    }

    private setHeaders(
        options?: ApiHeaderOptions
    ): Record<string, AxiosHeaderValue> {
        const headers: Record<string, AxiosHeaderValue> = {
            ...this.defaultHeaders,
            'x-api-key': this.xApiKey,
        };

        if (options?.token) {
            headers.Authorization = `Bearer ${options.token}`;
        }
        if (options?.workspace) {
            headers['x-workspace'] = `${options.workspace}`;
        }

        return headers;
    }

    private setInterceptor(): void {
        // this.api.interceptors.request.use(
        //     (config: InternalAxiosRequestConfig) => {
        //         if (config.headers.Authorization) {
        //             const currentTime = Date.now() / 1000;
        //             let isExpiredAccessToken = false;
        //             const token: string[] =
        //                 config.headers.Authorization.toString().split(' ');
        //             if (!token[1]) {
        //                 isExpiredAccessToken = true;
        //             }

        //             const decodedAccessToken = jwtDecode(token[1]!);
        //             isExpiredAccessToken =
        //                 decodedAccessToken.exp! < currentTime;

        //             if (isExpiredAccessToken) {
        //                 // TODO: REFRESH
        //                 const refreshToken = ''; // Get from state or local storage
        //                 const decodedRefreshToken = jwtDecode(refreshToken);
        //                 const isExpiredRefreshToken =
        //                     decodedRefreshToken.exp! < currentTime;

        //                 if (isExpiredRefreshToken) {
        //                     // TODO: CHANGE WITH YOUR ERROR SCHEMA
        //                     throw new Error('Token Expired');
        //                 }

        //                 // TODO: DO REFRESH TOKEN, HIT BACKEND
        //                 const newAccessToken = ''; // update state or local storage
        //                 config.headers.Authorization = `Bearer ${newAccessToken}`;
        //             }

        //             return config;
        //         }

        //         return config;
        //     }
        // );

        this.api.interceptors.response.use(
            (response: AxiosResponse<ApiResponse>) => {
                const httpCode = response.status;

                if (httpCode === HttpStatusCode.Unauthorized) {
                    // TODO: LOGOUT
                    // TODO: CHANGE WITH YOUR ERROR SCHEMA
                    throw new Error('Unauthorized');
                } else if (httpCode === HttpStatusCode.Forbidden) {
                    // TODO: SWITCH CASE
                    // 1. CHECK USER IF HAVE AT LEAST 1 WORKSPACE
                    // 2. NOT HAVE PERMISSION
                    // TODO: CHANGE WITH YOUR ERROR SCHEMA
                    throw new Error('Forbidden');
                } else if (httpCode >= 200 && httpCode < 300) {
                    // Proses respons yang sukses
                    return response;
                }
                // TODO: CHANGE WITH YOUR ERROR SCHEMA
                throw new Error('Internal Server Error');
            },
            (error: AxiosResponse<ApiErrorResponse>) => {
                return Promise.reject(error);
            }
        );
    }

    async get<T = Record<string, any>>(
        url: string,
        options?: ApiRequestOptions
    ): Promise<ApiResponse<T>> {
        const headers = this.setHeaders(options);

        const response = await this.api.get<ApiResponse<T>>(url, {
            params: options?.queries,
            signal: options?.signal?.signal,
            headers,
        });

        return response.data;
    }

    async getPagination<T = Record<string, any>>(
        url: string,
        pagination: ApiPagination,
        options?: ApiRequestOptions
    ): Promise<ApiPaginationResponse<T>> {
        const headers = this.setHeaders(options);

        const response = await this.api.get<ApiPaginationResponse<T>>(url, {
            params: { ...options?.queries, ...pagination },
            signal: options?.signal?.signal,
            headers,
        });

        return response.data;
    }

    async post<T = Record<string, any>>(
        url: string,
        data?: Record<string, any>,
        options?: ApiRequestOptions
    ): Promise<ApiResponse<T>> {
        const headers = this.setHeaders(options);

        const response = await this.api.post<ApiResponse<T>>(url, data, {
            params: options?.queries,
            signal: options?.signal?.signal,
            headers,
        });

        return response.data;
    }

    async postForm<T = Record<string, any>>(
        url: string,
        data?: Record<string, any>,
        options?: ApiRequestOptions
    ): Promise<ApiResponse<T>> {
        const headers = this.setHeaders(options);

        const response = await this.api.postForm<ApiResponse<T>>(url, data, {
            params: options?.queries,
            signal: options?.signal?.signal,
            headers,
        });

        return response.data;
    }

    async put<T = Record<string, any>>(
        url: string,
        data?: Record<string, any>,
        options?: ApiRequestOptions
    ): Promise<ApiResponse<T>> {
        const headers = this.setHeaders(options);

        const response = await this.api.put<ApiResponse<T>>(url, data, {
            params: options?.queries,
            signal: options?.signal?.signal,
            headers,
        });

        return response.data;
    }

    async patch<T = Record<string, any>>(
        url: string,
        data?: Record<string, any>,
        options?: ApiRequestOptions
    ): Promise<ApiResponse<T>> {
        const headers = this.setHeaders(options);

        const response = await this.api.patch<ApiResponse<T>>(url, data, {
            params: options?.queries,
            signal: options?.signal?.signal,
            headers,
        });

        return response.data;
    }

    async delete<T = Record<string, any>>(
        url: string,
        options?: ApiRequestOptions
    ): Promise<ApiResponse<T>> {
        const headers = this.setHeaders(options);

        const response = await this.api.delete<ApiResponse<T>>(url, {
            params: options?.queries,
            signal: options?.signal?.signal,
            headers,
        });

        return response.data;
    }
}
