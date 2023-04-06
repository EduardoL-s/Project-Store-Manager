const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');

const salesMock = require('../mocks/sales.mock');
const { salesService } = require('../../../src/services');
const { salesModel } = require('../../../src/models');

describe('Testes referentes aos services da tabela sales', function () {

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

  afterEach(function () {
    sinon.restore();
  });
});