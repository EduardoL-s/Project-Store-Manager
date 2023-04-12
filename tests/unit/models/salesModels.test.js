const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');

const salesMock = require('../mocks/sales.mock');

describe('Testes referentes aos models da tabela sales', function () {
  
  it('Realiza a operação de resgatar todos os valores da tabela', async function () {
    sinon.stub(connection, 'execute').resolves([salesMock]);
    const result = await salesModel.getAllSales();
    expect(result).to.be.equal(salesMock);
  });

  it('Realiza a operação de resgatar um único valor da tabela a partir do id', async function () {
    sinon.stub(connection, 'execute').resolves([salesMock[2]]);
    const result = await salesModel.getSaleById(2);
    expect(result).to.be.equal(salesMock[2]);
  });

  it('Realiza a operação de deletar uma venda da tabela a partir do id', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }, null]);
    const id = 1;
    const result = await salesModel.deleteSale(id);
    expect(result.affectedRows).to.be.equal(1);
  });

  it('Realiza a operação de inserir uma venda na tabela Sales', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }, null]);
    const [result] = await salesModel.insertNewDate();
    expect(result.affectedRows).to.be.equal(1);
  });

  it('Realiza a operação de inserir uma venda na tabela sales_product', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }, null]);
    const saleId = 4
    const productId = 1
    const quantity = 15
    const [result] = await salesModel.insertNewSale(saleId, productId, quantity);
    expect(result.affectedRows).to.be.equal(1);
  });

  afterEach(function () {
    sinon.restore();
  });
});