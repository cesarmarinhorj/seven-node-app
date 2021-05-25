"use strict";

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
const Route = use("Route");

Route.post("/tipi/list", "TipiController.list");
Route.post("/tipifilho/list", "TipiFilhoController.list");

Route.get("/users", "UserController.show");
Route.post("/users", "UserController.create");
Route.put("/users", "UserController.update");

Route.get("/empresas", "EmpresaController.show");
Route.post("/empresas", "EmpresaController.create");
Route.post("/empresas/remover", "EmpresaController.remove");

Route.post("/sessions", "SessionController.create");

Route.get("/recuperator/products/:id", "Recuperator.list");
Route.get("/recuperator/:id", "Recuperator.show");
Route.post("/recuperator", "Recuperator.create");
Route.put("/recuperator/products", "Recuperator.update");

Route.post("/recuperator/upload", "XmlController.upload");
