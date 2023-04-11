const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const { productModel } = require('../../../src/models');

const productsMock = require('../mocks/products.mock');
const { productService } = require('../../../src/services');

describe('Testes referentes aos services da tabela products', function () {

  it('Verifica se ao tentar resgatar todos os produtos do banco de dados, retorna o status esperado', async function () {
    sinon.stub(productModel, 'getAllProducts').resolves(productsMock);
    const result = await productService.findProducts();
    expect(result).to.be.equal(productsMock);
  });

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

  it('Verifica se ao tentar realizar o update de um único valor da tabela a partir do id, retorna o status esperado', async function () {
    sinon.stub(productModel, 'updateProduct').resolves({ affectedRows: 1 });
    const id = 1;
    const name = 'traje do batman';
    const result = await productService.productForUpdate(id, name);
    expect(result.status).to.be.equal(200);
  });
  
  it('Verifica se ao tentar realizar o update de um único valor da tabela a partir do id inexistente, retorna mensagem de erro', async function () {
    sinon.stub(productModel, 'updateProduct').resolves({ affectedRows: 0 });
    const id = 99;
    const name = 'traje do batman';
    const error = await productService.productForUpdate(id, name);
    expect(error.status).to.be.equal(404);
  });

  it('Verifica se ao tentar inserir um novo produto, a operação retorna o status e resposta desejadas', async function () {
    sinon.stub(productModel, 'insertNewProduct').resolves([{ affectedRows: 1 }, null]);
    const name = 'Jóia da realidade'
    const result = await productService.NewProduct(name);
    expect(result.status).to.be.equal(201);
  });

  it('Verifica se ao tentar realizar o delete passando um id correto, a operação finaliza como esperado', async function () {
    sinon.stub(productModel, 'deleteProduct').resolves([{ id: 1, name: 'Martelo de Thor' }]);
    const id = 1;
    const result = await productService.productForDelete(id);
    expect(result.status).to.be.equal(204);
  });

  it('verifica se ao tentar realizar o delete passando um id inexistente, a operação retorna o status esperado', async function () {
    sinon.stub(productModel, 'deleteProduct').resolves(undefined);
    const id = 99;
    const error = await productService.productForDelete(id);
    expect(error.status).to.be.equal(404);
  })

  afterEach(function () {
    sinon.restore();
  });

});