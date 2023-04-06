const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const { productModel } = require('../../../src/models');

const productsMock = require('../mocks/products.mock');
const { productService } = require('../../../src/services');

describe('Testes referentes aos services da tabela products', function () {

  it('Verifica se ao tentar resgatar um único valor da tabela a partir do id inexistente, retorna mensagem de erro', async function () {
    sinon.stub(productModel, 'getProductById').resolves(undefined);
    const id = 9;
    const error = await productService.isValidIdProduct(id);
    expect(error.type).to.be.equal('ID_NOT_FOUND');
    expect(error.message).to.be.equal('Product not found');
  });

  it('Verifica se ao tentar resgatar um único valor da tabela a partir do id inexistente, retorna a venda correta', async function () {
    sinon.stub(productModel, 'getProductById').resolves(productsMock[0]);
    const id = 1;
    const error = await productService.isValidIdProduct(id);
    expect(error.type).to.be.equal(null);
    expect(error.message).to.be.equal(productsMock[0]);
  });

  afterEach(function () {
    sinon.restore();
  });
});