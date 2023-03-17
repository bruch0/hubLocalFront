export class GenericApiConnection {
  get: (
    url: string
  ) => Promise<{ data: { statusCode: number; content: string } }>;
  post: (
    url: string,
    data: any
  ) => Promise<{ data: { statusCode: number; content: string } }>;
  put: (
    url: string,
    data: any
  ) => Promise<{ data: { statusCode: number; content: string } }>;
  delete: (
    url: string
  ) => Promise<{ data: { statusCode: number; content: string } }>;
}
