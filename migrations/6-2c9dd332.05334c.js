
module.exports.id = '6.2c9dd332.05334c';

/**
 * @description flow 2c9dd332.05334c update
 * @param done
 */
   

module.exports.up = function (done) {
  let coll = this.db.collection('noderedstorages');
  coll.update({'path':'2c9dd332.05334c','type':'flows'}, {
    $set: {'path':'2c9dd332.05334c','body':[{'id':'5a35929d.0a716c','type':'http in','z':'2c9dd332.05334c','name':'create addr','url':'/addr','method':'post','upload':false,'swaggerDoc':'','x':130,'y':140,'wires':[['4ae0a952.a4e188']]},{'id':'e4822e75.693fd','type':'http response','z':'2c9dd332.05334c','name':'','statusCode':'','x':1029,'y':140,'wires':[]},{'id':'27b27b8e.9827a4','type':'mongo','z':'2c9dd332.05334c','model':'EthAccount','request':'{}','options':'','name':'mongo create addr','mode':'1','requestType':'1','dbAlias':'','x':607,'y':140,'wires':[['8ab75856.970bb8']]},{'id':'8ab75856.970bb8','type':'function','z':'2c9dd332.05334c','name':'transform output','func':'\nlet factories = global.get("factories"); \n\nif(msg.payload.error){\n    msg.payload = msg.payload.error.code === 11000 ? \n    factories.messages.address.existAddress :\n    factories.messages.generic.fail;\n    return msg;\n}\n    \n    \nmsg.payload = factories.messages.generic.success;\nreturn msg;','outputs':1,'noerr':0,'x':814,'y':140,'wires':[['e4822e75.693fd']]},{'id':'65927d71.4e8c44','type':'http in','z':'2c9dd332.05334c','name':'remove addr','url':'/addr','method':'delete','upload':false,'swaggerDoc':'','x':130,'y':240,'wires':[['316484c0.63001c']]},{'id':'d0426981.27e8a8','type':'http response','z':'2c9dd332.05334c','name':'','statusCode':'','x':1030,'y':240,'wires':[]},{'id':'7c68e0a0.c140d','type':'mongo','z':'2c9dd332.05334c','model':'EthAccount','request':'{}','name':'mongo','mode':'1','requestType':'3','x':590,'y':240,'wires':[['cdd0bdcd.24b59']]},{'id':'cdd0bdcd.24b59','type':'function','z':'2c9dd332.05334c','name':'transform output','func':'\nlet factories = global.get("factories"); \n\nif(msg.payload.error){\n    msg.payload = factories.messages.generic.fail;\n    return msg;\n}\n    \n    \nmsg.payload = factories.messages.generic.success;\nreturn msg;','outputs':1,'noerr':0,'x':800,'y':240,'wires':[['d0426981.27e8a8']]},{'id':'316484c0.63001c','type':'function','z':'2c9dd332.05334c','name':'transform params','func':'\nmsg.payload = {\n    model: \'NemAccount\', \n    request: {\n       address: msg.payload.address\n   }\n};\n\nreturn msg;','outputs':1,'noerr':0,'x':330,'y':240,'wires':[['7c68e0a0.c140d']]},{'id':'468de3dc.eb162c','type':'http in','z':'2c9dd332.05334c','name':'balance','url':'/addr/:addr/balance','method':'get','upload':false,'swaggerDoc':'','x':170,'y':420,'wires':[['6731d0f7.68fb4']]},{'id':'6731d0f7.68fb4','type':'function','z':'2c9dd332.05334c','name':'transform params','func':'\nmsg.payload = {\n    model: \'NemAccount\', \n    request: {\n       address: msg.req.params.addr\n   }\n};\n\nreturn msg;','outputs':1,'noerr':0,'x':372.500003814698,'y':419.99999809265,'wires':[['a66b89d5.08b868']]},{'id':'a66b89d5.08b868','type':'mongo','z':'2c9dd332.05334c','model':'EthAccount','request':'{}','name':'mongo','mode':'1','requestType':'0','x':562.500003814698,'y':421.24999904632,'wires':[['c0a32965.e18618']]},{'id':'6e227f25.b210e','type':'http response','z':'2c9dd332.05334c','name':'','statusCode':'','x':991.250007629395,'y':419.99999904632,'wires':[]},{'id':'e859d127.685df','type':'catch','z':'2c9dd332.05334c','name':'','scope':null,'x':340,'y':607,'wires':[['d47923c.db3aae','547d0ad7.ffb894']]},{'id':'2e2f80ee.29994','type':'http response','z':'2c9dd332.05334c','name':'','statusCode':'','x':797,'y':608,'wires':[]},{'id':'d47923c.db3aae','type':'function','z':'2c9dd332.05334c','name':'transform','func':'\nlet factories = global.get("factories"); \nlet error = msg.error.message;\ntry {\n    error = JSON.parse(error);\n}catch(e){}\n\nmsg.payload = error && error.code === 11000 ? \nfactories.messages.address.existAddress :\nfactories.messages.generic.fail;\n   \nreturn msg;','outputs':1,'noerr':0,'x':581,'y':607,'wires':[['2e2f80ee.29994']]},{'id':'547d0ad7.ffb894','type':'debug','z':'2c9dd332.05334c','name':'','active':true,'console':'false','complete':'error','x':457.076400756836,'y':533.347267150879,'wires':[]},{'id':'4ae0a952.a4e188','type':'async-function','z':'2c9dd332.05334c','name':'','func':'const nem = global.get(\'nem.lib\'),\n endpoint = global.get(\'nem.endpoint\'),\n network = global.get(\'nem.network\'),\n _ = global.get(\'_\');\n\nmsg.payload.address = msg.payload.address.replace(/[^\\w\\s]/gi, \'\');\n\nlet data = await nem.com.requests.account.data(endpoint, msg.payload.address);\nlet balance = _.get(data, \'account.balance\', 0);\nlet vestedBalance = _.get(data, \'account.vestedBalance\', 0);\n\nlet unconfirmedTxs = await nem.com.requests.account.transactions.unconfirmed(endpoint, msg.payload.address);\n\n\nlet balanceDelta = _.chain(unconfirmedTxs.data)\n        .transform((result, item) => {\n\n          if (item.transaction.recipient === nem.model.address.toAddress(item.transaction.signer, network)) //self transfer\n            return;\n\n          if (msg.payload.address === item.transaction.recipient)\n            result.val += item.transaction.amount;\n\n          if (msg.payload.address === nem.model.address.toAddress(item.transaction.signer, network)) {\n            result.val -= item.transaction.amount;\n          }\n          return result;\n        }, {val: 0})\n        .get(\'val\')\n        .value();\n\n\nlet accMosaics = await nem.com.requests.account.mosaics.owned(endpoint, msg.payload.address);\n\n      const mosaicsConfirmed = _.chain(accMosaics).get(\'data\', []).transform((acc, m) => \n            acc[`${m.mosaicId.namespaceId}:${m.mosaicId.name}`] = m.quantity, \n            {}).value();\n\n\n      let mosaicsUnconfirmed = _.chain(unconfirmedTxs.data)\n        .filter(item=>_.has(item, \'transaction.mosaics\'))\n        .transform((result, item) => {\n\n          if (item.transaction.recipient === nem.model.address.toAddress(item.transaction.signer, network)) //self transfer\n            return;\n\n          if (msg.payload.address === item.transaction.recipient) {\n            item.transaction.mosaics.forEach(mosaic => {\n              result[`${mosaic.mosaicId.namespaceId}:${mosaic.mosaicId.name}`] = (result[`${mosaic.mosaicId.namespaceId}:${mosaic.mosaicId.name}`] || 0) + mosaic.quantity\n            });\n\n          }\n\n          if (msg.payload.address === nem.model.address.toAddress(item.transaction.signer, network)) {\n            item.transaction.mosaics.forEach(mosaic => {\n              result[`${mosaic.mosaicId.namespaceId}:${mosaic.mosaicId.name}`] = (result[`${mosaic.mosaicId.namespaceId}:${mosaic.mosaicId.name}`] || 0) - mosaic.quantity\n            });\n          }\n          return result;\n        }, {})\n        .toPairs()\n        .transform((result, pair) => {\n          result[pair[0]] = (mosaicsConfirmed[pair[0]] || 0) + pair[1]\n        }, {})\n        .value();\n\n\nmsg.payload = {\n    model: \'NemAccount\', \n    request: {\n       address: msg.payload.address,\n       balance: {\n           confirmed: balance,\n           vested: vestedBalance,\n           unconfirmed: balanceDelta ? balance + balanceDelta : 0\n       },\n       mosaics: {\n        confirmed: mosaicsConfirmed,\n        unconfirmed: mosaicsUnconfirmed\n       }\n   }\n};\n\nreturn msg;','outputs':1,'noerr':6,'x':350,'y':140,'wires':[['27b27b8e.9827a4']]},{'id':'c0a32965.e18618','type':'async-function','z':'2c9dd332.05334c','name':'','func':'const nem = global.get(\'nem.lib\'),\n endpoint = global.get(\'nem.endpoint\'),\n _ = global.get(\'_\');\n \nlet account = msg.payload[0];\n\nlet mosaicsConfirmed = _.get(account, \'mosaics.confirmed\', {});\n\nlet confirmedBalance = _.get(account, \'balance.confirmed\', 0);\nlet unconfirmedBalance = _.get(account, \'balance.unconfirmed\', 0);\nlet vestedBalance = _.get(account, \'balance.vested\', 0);\n\n\n\nlet balance = {\n    confirmed: {\n      value: confirmedBalance,\n      amount: `${(confirmedBalance/1000000).toFixed(6)}`\n    },\n    unconfirmed: {\n      value: unconfirmedBalance,\n      amount: `${(unconfirmedBalance/1000000).toFixed(6)}`\n    },\n    vested: {\n      value: vestedBalance,\n      amount: `${(vestedBalance/1000000).toFixed(6)}`\n    }\n}\n\nmosaics = _.chain(mosaicsConfirmed)\n  .toPairs()\n  .map(pair=>{\n      let definition = pair[0].split(\':\');\n      let name = definition[1];\n      let namespaceId = definition[0];\n      return {\n          name: definition[1],\n          namespaceId: definition[0],\n          quantity: pair[1]\n      };\n  })\n  .value();\n\n\n  mosaics = await Promise.map(mosaics, async mosaic=> {\n\n  let definition = await nem.com.requests.namespace.mosaicDefinitions(endpoint, mosaic.namespaceId);\n\n  mosaic.value = mosaic.quantity / _.chain(definition)\n      .get(\'data\')\n      .find({mosaic: {id: {name: mosaic.name}}})\n      .get(\'mosaic.properties\')\n      .find({name:\'divisibility\'})\n      .get(\'value\', 1)\n      .thru(val=>Math.pow(10, val))\n      .value();\n\nreturn mosaic;      \n      \n  });\n\nmosaics = _.transform(mosaics, (acc, item) => {\n    \n    acc[`${item.namespaceId}:${item.name}`] = {\n        amount: item.value,\n        value: item.quantity\n        \n    }\n    \n    \n}, {});\n\nmsg.payload = {balance, mosaics};\n\nreturn msg;\n','outputs':1,'noerr':12,'x':750,'y':420,'wires':[['6e227f25.b210e']]}]}
  }, {upsert: true}, done);
};

module.exports.down = function (done) {
  let coll = this.db.collection('noderedstorages');
  coll.remove({'path':'2c9dd332.05334c','type':'flows'}, done);
};
