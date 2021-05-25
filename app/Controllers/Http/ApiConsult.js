"use strict";

const axios = require("axios");
const Produto = use("App/Models/Produto");

class ApiConsultController {
  async searchInApi(ncm) {
    try {
      const data = await axios.get(
        `https://ics.multieditoras.com.br/ics/pis?chave=TFACS-RAX7S-5W3Z2-DWNZ7&cliente=10127194&ncm=${ncm}&formato=json`
      );

      return data.data;
    } catch (e) {
      return "tributado";
    }
  }

  async isMonofasico(data) {
    if (data === "tributado") {
      return "tributado";
    }

    return new Promise((resolve, reject) => {
      let type = "tributado";

      data.pis.forEach((e) => {
        if (e.regimeOutroRem !== undefined) {
          type = "monofasico";
        }
      });
      resolve(type);
    });
  }

  async verifyNcm(productId, ncm) {
    const ncmSearch = await this.searchInApi(ncm);

    this.isMonofasico(ncmSearch).then(async (result) => {
      await Produto.query()
        .where("id", productId)
        .update({ tributacao: result });
    });
  }
}

module.exports = ApiConsultController;
