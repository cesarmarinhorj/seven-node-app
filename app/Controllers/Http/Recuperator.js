"use strict";

const Database = use("Database");

const Produto = use("App/Models/Produto");

const Auditoria = use("App/Models/Auditoria");

class RecuperatorController {
  async show({ request, response }) {
    const innerJoinPis = await Database.table("produtos")
      .sum("pis as pis")
      .innerJoin("notas_fiscais", "notas_fiscais.id", "produtos.id_nfe")
      .innerJoin("auditorias", "auditorias.id", "notas_fiscais.id_auditoria")
      .where("auditorias.id", request.params.id);

    const innerJoinCofins = await Database.table("produtos")
      .sum("cofins as cofins")
      .innerJoin("notas_fiscais", "notas_fiscais.id", "produtos.id_nfe")
      .innerJoin("auditorias", "auditorias.id", "notas_fiscais.id_auditoria")
      .where("auditorias.id", request.params.id);

    return response.json({
      id: request.params.id,
      pis: innerJoinPis[0].pis,
      cofins: innerJoinCofins[0].cofins,
    });
  }

  async create({ request, response }) {
    const { id_empresa } = request.body;

    const create = await Auditoria.create({ id_empresa: id_empresa });

    return response.json({ id: create.id, id_empresa: create.id_empresa });
  }

  async list({ request, response }) {
    const produtos = await Database.table("produtos")
      .select(
        "produtos.id",
        "produtos.nome",
        "produtos.tributacao",
        "produtos.ncm"
      )
      .innerJoin("notas_fiscais", "notas_fiscais.id", "produtos.id_nfe")
      .innerJoin("auditorias", "auditorias.id", "notas_fiscais.id_auditoria")
      .where("auditorias.id", request.params.id);

    return response.json(produtos);
  }

  async update({ request, response }) {
    await Produto.query()
      .where("id", request.body.id)
      .update({ tributacao: request.body.tributacao, ncm: request.body.ncm });
  }
}

module.exports = RecuperatorController;