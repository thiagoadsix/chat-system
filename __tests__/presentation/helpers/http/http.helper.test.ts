import { describe, it, expect } from 'vitest'

import {
  badRequest,
  serverError,
  ok,
  noContent,
  unauthorized,
  forbidden
} from '@presentation/helpers'
import { ServerError, UnauthorizedError } from '@presentation/errors'

describe('HTTP Response Helpers', () => {
  describe('badRequest', () => {
    it('should return statusCode 400 with the provided error as body', () => {
      const error = new Error('Invalid input')
      const response = badRequest(error)
      expect(response).toEqual({
        statusCode: 400,
        body: error
      })
    })
  })

  describe('serverError', () => {
    it('should return statusCode 500 with a ServerError wrapping the error stack', () => {
      const error = new Error('Something went wrong')
      const response = serverError(error)
      expect(response.statusCode).toBe(500)
      expect(response.body).toBeInstanceOf(ServerError)
      expect(response.body.message).toContain('Internal server error.')
    })
  })

  describe('ok', () => {
    it('should return statusCode 200 with the provided data as body', () => {
      const data = { id: 1, name: 'test' }
      const response = ok(data)
      expect(response).toEqual({
        statusCode: 200,
        body: data
      })
    })
  })

  describe('noContent', () => {
    it('should return statusCode 204 with a null body', () => {
      const response = noContent()
      expect(response).toEqual({
        statusCode: 204,
        body: null
      })
    })
  })

  describe('unauthorized', () => {
    it('should return statusCode 401 with an UnauthorizedError as body', () => {
      const response = unauthorized()
      expect(response.statusCode).toBe(401)
      expect(response.body).toBeInstanceOf(UnauthorizedError)
    })
  })

  describe('forbidden', () => {
    it('should return statusCode 403 with the provided error as body', () => {
      const error = new Error('Access denied')
      const response = forbidden(error)
      expect(response).toEqual({
        statusCode: 403,
        body: error
      })
    })
  })
})
