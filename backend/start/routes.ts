/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const AuthController = () => import('#controllers/auth_controller')
const GameController = () => import('#controllers/games_controller')

// Public routes
router.group(() => {
router.post('/signup', [AuthController, 'signup'])
router.post('/signin', [AuthController, 'signin'])
router.post('/signout', [AuthController, 'signout'])
}).prefix('api')


// Protected routes
router.group(() => {
  router.get('/get-answers', [GameController, 'getAnswers'])
  
  // CRUD routes for answers
  router.get('/answers', [GameController, 'getAllAnswers']).use(middleware.jwt())
  router.get('/answers/:id', [GameController, 'getAnswerById']).use(middleware.jwt())
  router.post('/answers', [GameController, 'createAnswer']).use(middleware.jwt())
  router.put('/answers/:id', [GameController, 'updateAnswer']).use(middleware.jwt())
  router.delete('/answers/:id', [GameController, 'deleteAnswer']).use(middleware.jwt())
}).prefix('api')

