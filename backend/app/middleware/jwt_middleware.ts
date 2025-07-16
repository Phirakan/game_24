import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import jwt from 'jsonwebtoken'
import env from '#start/env'
import User from '#models/user'

declare module '@adonisjs/core/http' {
  interface HttpContext {
    user?: InstanceType<typeof User>
  }
}

export default class JwtMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    try {
      const authHeader = ctx.request.header('Authorization')
      console.log('Authorization header:', authHeader)
      
      const token = authHeader?.replace('Bearer ', '')
      console.log('Extracted token:', token)
      
      if (!token) {
        console.log('No token provided')
        return ctx.response.status(401).json({
          error: 'Access token is required'
        })
      }

      const jwtSecret = env.get('JWT_SECRET')
      console.log('JWT Secret exists:', !!jwtSecret)
      
      if (!jwtSecret) {
        console.log('JWT secret not configured')
        return ctx.response.status(500).json({
          error: 'JWT secret is not configured'
        })
      }
      
      console.log('Attempting to verify token...')
      const decoded = jwt.verify(token, jwtSecret) as any
      console.log('Decoded token:', decoded)
      
      const user = await User.find(decoded.userId)
      console.log('User query - looking for ID:', decoded.userId)
      console.log('User found:', !!user)
      console.log('User object:', user)
      
      if (!user) {
        console.log('User not found for userId:', decoded.userId)
        return ctx.response.status(401).json({
          error: 'Invalid token - user not found'
        })
      }

      // Store user in the context directly instead of auth.user
      ctx.user = user
      console.log('Authentication successful for user:', user.id)
      await next()
    } catch (error) {
      console.error('JWT verification failed:', error)
      return ctx.response.status(401).json({
        error: 'Invalid token',
        details: error.message
      })
    }
  }
}