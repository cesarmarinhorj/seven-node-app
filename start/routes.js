'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('/tipi/list', 'TipiController.list');
Route.post('/tipifilho/list', 'TipiFilhoController.list');

Route.get('/users', 'UserController.show')
Route.post('/users', 'UserController.create')
Route.put('/users', 'UserController.update')

Route.post('/sessions', 'SessionController.create')