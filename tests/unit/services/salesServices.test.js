const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');

const salesMock = require('../mocks/sales.mock');
const { salesService } = require('../../../src/services');
const { salesModel } = require('../../../src/models');

describe('Testes referentes aos services da tabela sales', function () {

  it('Verifica se ao tentar resgatar todas as vendas do banco de dados, retorna o status esperado', async function () {
    sinon.stub(salesModel, 'getAllSales').resolves(salesMock);
    const result = await salesService.findSales();
    expect(result).to.be.equal(salesMock);
  });

  it('Verifica se ao tentar resgatar um único valor da tabela a partir do id inexistente, retorna mensagem de erro', async function () {
    sinon.stub(salesModel, 'getSaleById').resolves([]);
    const id = 9;
    const error = await salesService.isValidIdSale(id);
    expect(error.type).to.be.equal('ID_NOT_FOUND');
    expect(error.message).to.be.equal('Sale not found');
  });

  it('Verifica se ao tentar resgatar um único valor da tabela a partir do id inexistente, retorna a venda correta', async function () {
    sinon.stub(salesModel, 'getSaleById').resolves(salesMock[2]);
    const id = 2;
    const error = await salesService.isValidIdSale(id);
    expect(error.type).to.be.equal(null);
    expect(error.message).to.be.equal(salesMock[2]);
  });

  it('Verifica se ao tentar deletar uma venda através de um id inexistente, returna mensagem de erro', async function () {
    sinon.stub(salesModel, 'deleteSale').resolves({ affectedRows: 0 });
    const id = 9;
    const error = await salesService.findSaleForDelete(id);
    expect(error.status).to.be.equal(404);
  });

  it('Verifica se ao tentar deletar uma venda através de um id inexistente, returna mensagem de erro', async function () {
    sinon.stub(salesModel, 'deleteSale').resolves({ affectedRows: 1 });
    const id = 2;
    const result = await salesService.findSaleForDelete(id);
    expect(result.status).to.be.equal(204);
  });

  afterEach(function () {
    sinon.restore();
  });
});