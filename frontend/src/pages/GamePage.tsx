import type React from "react"
import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { gameAPI } from "../service/api"
import Loading from "../components/Loading"

const GamePage: React.FC = () => {
  const [numbers, setNumbers] = useState<string[]>(["", "", "", ""])
  const [solutions, setSolutions] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [cached, setCached] = useState(false)
  const { user, logout } = useAuth()

  const handleNumberChange = (index: number, value: string) => {
    const newNumbers = [...numbers]
    newNumbers[index] = value
    setNumbers(newNumbers)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSolutions([])

    try {
      // Validate input
      const numArray = numbers.map((n) => Number.parseInt(n))

      if (numArray.some((n) => isNaN(n) || n < 1)) {
        setError("Please enter valid numbers (must be 1 or greater)")
        setIsLoading(false)
        return
      }

      if (numArray.some((n) => n === 0)) {
        setError("Numbers cannot be zero")
        setIsLoading(false)
        return
      }

      const hasDuplicates = numArray.length !== new Set(numArray).size
      if (hasDuplicates) {
        setError("Please enter 4 different numbers (no duplicates allowed)")
        setIsLoading(false)
        return
      }

      const response = await gameAPI.getAnswers(numArray)
      setSolutions(response.solutions)
      setCached(response.cached)

      if (response.solutions.length === 0) {
        setError("No solutions found for these numbers")
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to get answers")
    } finally {
      setIsLoading(false)
    }
  }

  const handleClear = () => {
    setNumbers(["", "", "", ""])
    setSolutions([])
    setError("")
    setCached(false)
  }

  const isFormValid = (() => {
    // Check if all numbers are filled and valid
    const allValid = numbers.every((n) => n !== "" && Number.parseInt(n) >= 1)

    // Check for duplicates
    const numArray = numbers.filter((n) => n !== "").map((n) => Number.parseInt(n))
    const hasDuplicates = numArray.length !== new Set(numArray).size

    return allValid && !hasDuplicates && numbers.every((n) => n !== "")
  })()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-50 to-yellow-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm shadow-lg border-b border-blue-100 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-5">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl shadow-md">
                <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent">
                  24 Game Solver
                </h1>
                <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                  <svg className="h-4 w-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Welcome back, <span className="font-semibold text-blue-600">{user?.username}</span>!
                </p>
              </div>
            </div>
            <button
              onClick={logout}
              className="group inline-flex items-center px-4 py-2.5 border border-red-200 rounded-lg text-sm font-medium text-red-600 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <svg
                className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Game Rules */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-100 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
          <div className="bg-gradient-to-r from-blue-500 to-blue-500 px-6 py-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Game Rules
            </h2>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <p className="text-gray-700 font-medium">Enter 4 numbers ( no zeros )</p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <p className="text-gray-700 font-medium">Use all 4 numbers exactly once</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <p className="text-gray-700 font-medium">Apply +, -, ×, ÷ operations</p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    4
                  </div>
                  <p className="text-gray-700 font-medium">Make the result equal 24</p>
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-blue-50 rounded-xl border border-blue-200">
              <p className="text-center font-mono text-lg font-semibold text-blue-800">
                Example: 6, 4, 3, 2 → 6 × 4 × (3 - 2) = 24
              </p>
            </div>
          </div>
        </div>

        {/* Input Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-100 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
          <div className="bg-gradient-to-r from-blue-500 to-blue-500 px-6 py-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Enter Your Numbers
            </h2>
            <p className="text-blue-100 text-sm mt-1">Input 4 numbers and discover all possible solutions</p>
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {numbers.map((number, index) => (
                  <div key={index} className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Number {index + 1}</label>
                    <div className="relative">
                      <input
                        type="number"
                        min="1"
                        value={number}
                        onChange={(e) => handleNumberChange(index, e.target.value)}
                        className="w-full px-4 py-4 text-center text-xl font-bold border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 bg-white hover:border-blue-300 group-hover:shadow-md"
                        placeholder="Number"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400 to-blue-400 opacity-0 group-focus-within:opacity-10 transition-opacity duration-200 pointer-events-none"></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  disabled={isLoading || !isFormValid}
                  className="flex-1 group relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-500 hover:from-blue-600 hover:to-blue-600 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <div className="flex items-center justify-center gap-3">
                    {isLoading ? (
                      <>
                        <Loading />
                        <span>Finding Solutions...</span>
                      </>
                    ) : (
                      <>
                        <svg
                          className="h-5 w-5 group-hover:rotate-12 transition-transform duration-200"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                          />
                        </svg>
                        <span>Get Solutions</span>
                      </>
                    )}
                  </div>
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  className="sm:w-auto w-full group px-6 py-4 border-2 border-blue-200 rounded-xl text-blue-700 bg-white hover:bg-blue-50 hover:border-blue-300 font-bold text-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <div className="flex items-center justify-center gap-3">
                    <svg
                      className="h-5 w-5 group-hover:rotate-12 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    <span>Clear All</span>
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 shadow-lg animate-pulse">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="p-2 bg-red-100 rounded-full">
                  <svg className="h-6 w-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-red-800">Oops! Something went wrong</h3>
                <p className="text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Solutions */}
        {solutions.length > 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-green-200 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <h2 className="text-xl font-bold text-white">🎉 Solutions Found ({solutions.length})</h2>
                </div>
                {cached && (
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-white text-sm font-medium">Cached</span>
                  </div>
                )}
              </div>
              <p className="text-green-100 text-sm mt-1">Here are all the ways to make 24 with your numbers</p>
            </div>
            <div className="p-6">
              <div className="grid gap-4">
                {solutions.map((solution, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-5 border-2 border-green-200 hover:border-green-300 hover:shadow-lg transition-all duration-200 transform hover:scale-[1.01]"
                  >
                    <div className="flex items-center justify-between">
                      <code className="text-xl font-mono font-bold text-green-800 bg-white/60 px-4 py-2 rounded-lg">
                        {solution} = 24
                      </code>
                      <div className="flex items-center gap-2">
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                          #{index + 1}
                        </span>
                        <button className="opacity-0 group-hover:opacity-100 p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all duration-200">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none rounded-xl"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default GamePage
