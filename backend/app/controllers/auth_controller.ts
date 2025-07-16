import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import Hash from '@adonisjs/core/services/hash'
import jwt from 'jsonwebtoken'
import env from '#start/env'

export default class AuthController {
  
  async signup({ request, response }: HttpContext) {
    try {
      const { username, password } = request.only(['username', 'password'])

      // Validation
      if (!username || !password) {
        return response.status(400).json({
          error: 'Username and password are required'
        })
      }

      if (username.length < 3) {
        return response.status(400).json({
          error: 'Username must be at least 3 characters long'
        })
      }

      if (password.length < 6) {
        return response.status(400).json({
          error: 'Password must be at least 6 characters long'
        })
      }

      // Check if user already exists
      const existingUser = await User.findBy('username', username)
      if (existingUser) {
        return response.status(409).json({
          error: 'Username already exists'
        })
      }

      // Create user
      const user = await User.create({
        username,
        password
      })

      // Generate JWT token
      const jwtSecret = env.get('JWT_SECRET') as string
      if (!jwtSecret) {
        throw new Error('JWT_SECRET is not defined in environment variables')
      }
      const token = jwt.sign(
        { userId: user.id, username: user.username },
        jwtSecret,
        { expiresIn: '2h' }
      )

      return response.status(201).json({
        message: 'User created successfully',
        user: {
          id: user.id,
          username: user.username
        },
        token
      })
    } catch (error) {
      console.error('Signup error:', error)
      return response.status(500).json({
        error: 'Internal server error'
      })
    }
  }

  async signin({ request, response }: HttpContext) {
    try {
      const { username, password } = request.only(['username', 'password'])

      // Validation
      if (!username || !password) {
        return response.status(400).json({
          error: 'Username and password are required'
        })
      }

      // Find user
      const user = await User.findBy('username', username)
      if (!user) {
        return response.status(401).json({
          error: 'Invalid credentials'
        })
      }

      // Verify password
      const isValidPassword = await Hash.verify(user.password, password)
      if (!isValidPassword) {
        return response.status(401).json({
          error: 'Invalid credentials'
        })
      }

      // Generate JWT token
      const jwtSecret = env.get('JWT_SECRET') as string
      if (!jwtSecret) {
        throw new Error('JWT_SECRET is not defined in environment variables')
      }
      const token = jwt.sign(
        { userId: user.id, username: user.username },
        jwtSecret,
        { expiresIn: '2h' }
      )

      return response.json({
        message: 'Login successful',
        user: {
          id: user.id,
          username: user.username
        },
        token
      })
    } catch (error) {
      console.error('Signin error:', error)
      return response.status(500).json({
        error: 'Internal server error'
      })
    }
  }

  async signout({ response }: HttpContext) {
    
    return response.json({
      message: 'Logout successful'
    })
  }


}