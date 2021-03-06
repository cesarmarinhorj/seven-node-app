'use strict'

const TipiFilho = use('App/Models/TipiFilho');

class TipiFilhoController {
  async list({ request, params }) {
    const consultaDescricao = await TipiFilho.query()
      .where('ncm_pai', Number(request.body.search))
      .fetch();

    return consultaDescricao;
  }
}

module.exports = TipiFilhoController
