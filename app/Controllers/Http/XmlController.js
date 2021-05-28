"use strict";

const Helpers = use("Helpers");
const fs = require("fs");
const convert = require("xml-js");
const NotasFiscais = use("App/Models/NotasFiscais");
const Produto = use("App/Models/Produto");
const ApiConsult = use("App/Controllers/Http/ApiConsult");

class XmlController {
  async upload({ request }) {
    
    console.log("passando aqui")
    const profilePics = request.file("uploadXml", {
      types: ["xml"],
    });


    await profilePics.moveAll(Helpers.tmpPath("uploads"), (file) => {
      return {
        name: `${new Date().getTime()}.${file.subtype}`,
      };
    });

    if (!profilePics.movedAll()) {
      console.log("DEU ERRO")
      return profilePics.errors();
    }

    const xmlToRecuperation = [];

    profilePics
      .movedList()
      .map((file) => xmlToRecuperation.push(file.fileName));

    return this.createRecuperation(
      xmlToRecuperation,
      request.body.id_auditoria
    );
  }

  openXml(xml) {
    return new Promise((resolve, reject) => {
      fs.readFile(`tmp/uploads/${xml}`, "utf8", function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  async createNfe(data, auditoriaId) {
    return new Promise((resolve, reject) => {
      const jsonData = JSON.parse(
        convert.xml2json(data, { compact: true, spaces: 2 })
      );

      const notaFiscal = {
        chave: jsonData.nfeProc.protNFe.infProt.chNFe._text,
        numero: 1,
        id_auditoria: auditoriaId,
      };

      NotasFiscais.create(notaFiscal).then((data) => {
        const nota = jsonData.nfeProc.NFe.infNFe.det;

        resolve([nota, data["$attributes"].id]);
      });
    });
  }

  async createProduct(data, nfeId) {
    return new Promise((resolve, reject) => {
      try {
        Produto.create({
          id_nfe: nfeId,
          nome: data.prod.xProd._text,
          ncm: data.prod.NCM._text,
          pis: data.imposto.PIS.PISOutr.pPIS._text,
          cofins: data.imposto.COFINS.COFINSOutr.pCOFINS._text,
        }).then((e) => resolve(e));
      } catch (e) {
        reject();
      }
    });
  }

  async createRecuperation(xmls, auditoriaId) {
    const consult = new ApiConsult();

    xmls.map((xml) =>
      this.openXml(xml).then((e) => {
        this.createNfe(e, auditoriaId).then(([products, nfeId]) => {
          products.forEach((product) =>
            this.createProduct(product, nfeId).then((result) => {
              consult.verifyNcm(result.id, result.ncm);
            })
          );
        });
      })
    );
  }
}

module.exports = XmlController;
