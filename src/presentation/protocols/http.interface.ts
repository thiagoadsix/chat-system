export type HttpRequest = {
  body?: any
  headers?: any
  params?: any
  jwtSign?: (payload: any) => Promise<string>
  userId?: string
}

export type HttpResponse = {
  statusCode: number
  body: any
}