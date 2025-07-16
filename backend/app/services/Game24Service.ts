export default class Game24Service {
  private static readonly TARGET = 24
  private static readonly EPSILON = 1e-9

  private static isEqual(a: number, b: number): boolean {
    return Math.abs(a - b) < this.EPSILON
  }

  private static generateExpressions(
    nums: number[],
    expressions: string[]
  ): { value: number; expression: string }[] {
    if (nums.length === 1) {
      return [{ value: nums[0], expression: expressions[0] }]
    }

    const results: { value: number; expression: string }[] = []
    
    for (let i = 0; i < nums.length; i++) {
      for (let j = i + 1; j < nums.length; j++) {
        const a = nums[i]
        const b = nums[j]
        const exprA = expressions[i]
        const exprB = expressions[j]

        const newNums = nums.filter((_, index) => index !== i && index !== j)
        const newExpressions = expressions.filter((_, index) => index !== i && index !== j)

        newNums.push(a + b)
        newExpressions.push(`(${exprA} + ${exprB})`)
        results.push(...this.generateExpressions([...newNums], [...newExpressions]))
        newNums.pop()
        newExpressions.pop()

        newNums.push(a - b)
        newExpressions.push(`(${exprA} - ${exprB})`)
        results.push(...this.generateExpressions([...newNums], [...newExpressions]))
        newNums.pop()
        newExpressions.pop()

        newNums.push(b - a)
        newExpressions.push(`(${exprB} - ${exprA})`)
        results.push(...this.generateExpressions([...newNums], [...newExpressions]))
        newNums.pop()
        newExpressions.pop()

        newNums.push(a * b)
        newExpressions.push(`(${exprA} * ${exprB})`)
        results.push(...this.generateExpressions([...newNums], [...newExpressions]))
        newNums.pop()
        newExpressions.pop()

        if (Math.abs(b) > this.EPSILON) {
          newNums.push(a / b)
          newExpressions.push(`(${exprA} / ${exprB})`)
          results.push(...this.generateExpressions([...newNums], [...newExpressions]))
          newNums.pop()
          newExpressions.pop()
        }

        if (Math.abs(a) > this.EPSILON) {
          newNums.push(b / a)
          newExpressions.push(`(${exprB} / ${exprA})`)
          results.push(...this.generateExpressions([...newNums], [...newExpressions]))
          newNums.pop()
          newExpressions.pop()
        }
      }
    }

    return results
  }

  private static cleanExpression(expression: string): string {

    expression = expression.replace(/^\((.+)\)$/, '$1')
    
    expression = expression.replace(/\(\(([^)]+)\)\)/g, '($1)')
    
    return expression
  }

  public static solve(numbers: number[]): string[] {
    if (numbers.length !== 4) {
      throw new Error('Must provide exactly 4 numbers')
    }

    if (numbers.some(num => num === 0)) {
      throw new Error('Numbers cannot contain zero')
    }

    const expressions = numbers.map(num => num.toString())
    const results = this.generateExpressions([...numbers], [...expressions])
    
    const solutions = new Set<string>()
    
    for (const result of results) {
      if (this.isEqual(result.value, this.TARGET)) {
        const cleanExpr = this.cleanExpression(result.expression)
        solutions.add(cleanExpr)
      }
    }

    return Array.from(solutions)
  }

  public static validateNumbers(numbers: number[]): { valid: boolean; error?: string } {
    if (numbers.length !== 4) {
      return { valid: false, error: 'Must provide exactly 4 numbers' }
    }

    if (numbers.some(num => num === 0)) {
      return { valid: false, error: 'Numbers cannot contain zero' }
    }

    if (numbers.some(num => !Number.isInteger(num) || num < 1 || num > 13)) {
      return { valid: false, error: 'Numbers must be integers between 1 and 13' }
    }

    return { valid: true }
  }

  public static createNumbersKey(numbers: number[]): string {
    return numbers.slice().sort((a, b) => a - b).join(',')
  }
}