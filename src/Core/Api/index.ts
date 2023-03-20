export class GenericApiConnection {
  get: (
    url: string,
    auth?: string
  ) => Promise<{ data: { statusCode: number; content: string } }>;
  post: (
    url: string,
    data: any,
    auth?: string
  ) => Promise<{ data: { statusCode: number; content: string } }>;
  put: (
    url: string,
    data: any,
    auth?: string
  ) => Promise<{ data: { statusCode: number; content: string } }>;
  delete: (
    url: string,
    auth?: string
  ) => Promise<{ data: { statusCode: number; content: string } }>;
}
