import type { HttpContext } from '@adonisjs/core/http'
import Answer from '#models/answer'
import Game24Service from '#services/Game24Service'

export default class GameController {
  async getAnswers({ request, response }: HttpContext) {
    try {
      const numbersParam = request.input('numbers')
      
      if (!numbersParam) {
        return response.status(400).json({
          error: 'Numbers parameter is required'
        })
      }

   
      let numbers: number[]
      
      if (Array.isArray(numbersParam)) {
 
        numbers = numbersParam.map((n: any) => parseInt(n.toString()))
        
      } else {

        numbers = numbersParam.split(',').map((n: string) => parseInt(n.trim()))

      }
      
      // Validate numbers
      const validation = Game24Service.validateNumbers(numbers)
      if (!validation.valid) {
        return response.status(400).json({
          error: validation.error
        })
      }

      // Check if have cached answers
      const cachedAnswer = await Answer.query()
        .where('numbers', JSON.stringify(numbers.sort((a: number, b: number) => a - b)))
        .first()

      if (cachedAnswer) {
        return response.json({
          numbers: cachedAnswer.numbersArray,
          solutions: cachedAnswer.solutionsArray,
          cached: true
        })
      }

      // Calculate new solutions
      const solutions = Game24Service.solve(numbers)
      
      // Save to cache
      await Answer.create({
        numbers: JSON.stringify(numbers.sort((a: number, b: number) => a - b)),
        solutions: JSON.stringify(solutions)
      })

      return response.json({
        numbers,
        solutions,
        cached: false
      })
    } catch (error) {
      console.error('Get answers error:', error)
      return response.status(500).json({
        error: 'Internal server error'
      })
    }
  }

  // CRUD Operations for Answers
  async getAllAnswers({ response }: HttpContext) {
    try {
      const answers = await Answer.all()
      return response.json(
        answers.map(answer => ({
          id: answer.id,
          numbers: answer.numbersArray,
          solutions: answer.solutionsArray,
          createdAt: answer.createdAt,
          updatedAt: answer.updatedAt
        }))
      )
    } catch (error) {
      console.error('Get all answers error:', error)
      return response.status(500).json({
        error: 'Internal server error'
      })
    }
  }

  async getAnswerById({ params, response }: HttpContext) {
    try {
      const answer = await Answer.findOrFail(params.id)
      return response.json({
        id: answer.id,
        numbers: answer.numbersArray,
        solutions: answer.solutionsArray,
        createdAt: answer.createdAt,
        updatedAt: answer.updatedAt
      })
    } catch (error) {
      return response.status(404).json({
        error: 'Answer not found'
      })
    }
  }

  async createAnswer({ request, response }: HttpContext) {
    try {
      const { numbers, solutions } = request.only(['numbers', 'solutions'])
      
      if (!numbers || !solutions) {
        return response.status(400).json({
          error: 'Numbers and solutions are required'
        })
      }

      const answer = await Answer.create({
        numbers: JSON.stringify(numbers),
        solutions: JSON.stringify(solutions)
      })

      return response.status(201).json({
        id: answer.id,
        numbers: answer.numbersArray,
        solutions: answer.solutionsArray,
        createdAt: answer.createdAt,
        updatedAt: answer.updatedAt
      })
    } catch (error) {
      console.error('Create answer error:', error)
      return response.status(500).json({
        error: 'Internal server error'
      })
    }
  }

  async updateAnswer({ params, request, response }: HttpContext) {
    try {
      const answer = await Answer.findOrFail(params.id)
      const { numbers, solutions } = request.only(['numbers', 'solutions'])
      
      if (numbers) {
        answer.numbers = JSON.stringify(numbers)
      }
      if (solutions) {
        answer.solutions = JSON.stringify(solutions)
      }

      await answer.save()

      return response.json({
        id: answer.id,
        numbers: answer.numbersArray,
        solutions: answer.solutionsArray,
        createdAt: answer.createdAt,
        updatedAt: answer.updatedAt
      })
    } catch (error) {
      return response.status(404).json({
        error: 'Answer not found'
      })
    }
  }

  async deleteAnswer({ params, response }: HttpContext) {
    try {
      const answer = await Answer.findOrFail(params.id)
      await answer.delete()

      return response.json({
        message: 'Answer deleted successfully'
      })
    } catch (error) {
      return response.status(404).json({
        error: 'Answer not found'
      })
    }
  }
}