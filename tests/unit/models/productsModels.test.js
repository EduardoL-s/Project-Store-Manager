const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const { productModel } = require('../../../src/models');

const productsMock = require('../mocks/products.mock');

describe('Testes referentes aos models da tabela products', function () {

  it('Realiza a operação de resgatar todos os valores da tabela', async function () {
    sinon.stub(connection, 'execute').resolves([productsMock]);
    const result = await productModel.getAllProducts();
    expect(result).to.be.equal(productsMock);
  });

  it('Realiza a operação de resgatar um único valor da tabela a partir do id', async function () {
    sinon.stub(connection, 'execute').resolves([productsMock[0]]);
    const result = await productModel.getProductById(1);
    expect(result).to.be.equal(productsMock[0]);
  });

  it('Realiza a operação de inserir um novo produto à tabela', async function () {
    sinon.stub(connection, 'execute').resolves([{affectedRows: 1, insertId: 4}, null]);
    const name = 'jóia do tempo'
    const result = await productModel.insertNewProduct(name);
    expect(result[0].affectedRows).to.be.equal(1);
    expect(result[0].insertId).to.be.equal(4);
  });

  it('Realiza a operação de atualizar um produto da tabela', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1, changedRows: 1 }, null]);
    const id = 2;
    const name = 'traje do batman'
    const result = await productModel.updateProduct(id, name);
    expect(result.affectedRows).to.be.equal(1);
    expect(result.changedRows).to.be.equal(1);
  });

  it('Realiza a operação de deletar um produto da tabela a partir do id', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }, null]);
    const id = 1;
    const result = await productModel.deleteProduct(id);
    expect(result.affectedRows).to.be.equal(1);
  });

  afterEach(function () {
    sinon.restore();
  });
  
});