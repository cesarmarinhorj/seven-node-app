'use strict'

const Empresa = use('App/Models/Empresa');

class EmpresaController {
    async create ({ request, auth }) {
        const user = await auth.getUser()

        const data = request.only(["cnpj", "razao_social", "inscricao_estadual", "estado"])

        const dataWithUser = {...{"user_id": user.id}, ...data}

        const empresa = await Empresa.create(dataWithUser)
    
        return empresa
    }

    async show({ auth }) {
        const user = await auth.getUser()
    
        return Empresa.query()
        .where('user_id', '=', user.id)
        .fetch()
    }
}

module.exports = EmpresaController
