import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Answer extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare numbers: string // JSON string of array

  @column()
  declare solutions: string // JSON string of array

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Getter for parsed numbers
  get numbersArray(): number[] {
    return JSON.parse(this.numbers)
  }

  // Getter for parsed solutions
  get solutionsArray(): string[] {
    return JSON.parse(this.solutions)
  }

  // Setter for numbers array
  set numbersArray(value: number[]) {
    this.numbers = JSON.stringify(value)
  }

  // Setter for solutions array
  set solutionsArray(value: string[]) {
    this.solutions = JSON.stringify(value)
  }
}