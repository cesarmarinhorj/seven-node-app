'use strict'

const Tipi = use('App/Models/Tipi');

class TipiController {
  async list({ request, params }) {

    if (isNaN(request.body.search)) {
      const consultaDescricao = await Tipi.query()
        .where('descricao', 'LIKE', request.body.search + '%')
        .fetch();
      return consultaDescricao;
    }

    const consultaDescricao = await Tipi.query()
      .where('ncm', request.body.search)
      .fetch();

    return consultaDescricao;
  }
}

module.exports = TipiController
