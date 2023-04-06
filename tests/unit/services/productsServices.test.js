const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const { productModel } = require('../../../src/models');

const productsMock = require('../mocks/products.mock');
const { productService } = require('../../../src/services');

describe('Testes referentes aos services da tabela products', function () {

  it('Verifica se ao tentar resgatar um único valor da tabela a partir do id inexistente, retorna mensagem de erro', async function () {
    sinon.stub(productModel, 'getProductById').resolves([]);
    const id = 9;
    const error = await productService.isValidIdProduct(id);
    expect(error.type).to.be.equal('ID_NOT_FOUND');
    expect(error.message).to.be.equal('Product not found');
  });

  it('Verifica se ao tentar resgatar um único valor da tabela a partir do id, retorna a venda correta', async function () {
    sinon.stub(productModel, 'getProductById').resolves([{ id: 1, name: 'Martelo de Thor' }]);
    const id = 1;
    const error = await productService.isValidIdProduct(id);
    expect(error.type).to.be.equal(null);
    expect(error.message).to.deep.equal({ id: 1, name: 'Martelo de Thor' });
  });


  it('Verifica se ao tentar realizar o update um único valor da tabela a partir do id inexistente, retorna mensagem de erro', async function () {
    sinon.stub(productModel, 'updateProduct').resolves([]);
    const id = 9;
    const name = 'traje do batman';
    const error = await productService.productForUpdate(id, name);
    expect(error.type).to.be.equal('PRODUCT_NOT_FOUND');
    expect(error.message).to.be.equal('Product not found');
  });

  it('Verifica se ao tentar realizar o update um único valor da tabela a partir do id, retorna a venda correta', async function () {
    const id = 1;
    const name = 'traje do batman';
    const error = await productService.productForUpdate(id, name);
    expect(error.type).to.be.equal(null);
  });

  afterEach(function () {
    sinon.restore();
  });
});