"use strict";

const Empresa = use("App/Models/Empresa");

const Database = use("Database");

class EmpresaController {
  async create({ request, auth }) {
    const user = await auth.getUser();

    const data = request.only([
      "cnpj",
      "razao_social",
      "inscricao_estadual",
      "estado",
    ]);

    const dataWithUser = { ...{ user_id: user.id }, ...data };

    const empresa = await Empresa.create(dataWithUser);

    return empresa;
  }

  async show({ auth }) {
    const user = await auth.getUser();

    return Empresa.query().where("user_id", "=", user.id).fetch();
  }

  async remove({ request, auth }) {
    const user = await auth.getUser();

    return await Database.table("empresas")
      .where({
        id: request.body.id,
        user_id: user.id,
      })
      .delete();
  }
}

module.exports = EmpresaController;
