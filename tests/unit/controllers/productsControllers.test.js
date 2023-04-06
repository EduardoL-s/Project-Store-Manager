const sinon = require('sinon');
const chai = require('chai');

const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { expect } = chai;

const { productService } = require('../../../src/services');

const { productsControllers } = require('../../../src/controllers');

describe('Testes referentes aos controllers da tabela products', function () {

  it('Verifica o retorno da função findAllProducts do controller do products, caso a operação seja um sucesso', async function () {
    sinon.stub(productService, 'isValidIdProduct').resolves();
    const res = {}
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsControllers.findAllProducts({}, res);

    expect(res.status).to.have.been.calledWith(200);
  });

  it('Verifica o retorno da função findProductsById do controller do product, caso a operação falhe', async function () {
    const resultFailled = { type: 'ID_NOT_FOUND', message: 'Product not found' }
    sinon.stub(productService, 'isValidIdProduct').resolves(resultFailled);

    const req = { params: { id: 9 } }

    const res = {}
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsControllers.findProductsById(req, res);

    expect(res.status).to.have.been.calledWith(404);
  });

  it('Verifica o retorno da função findProductsById do controller do products, caso a operação seja um sucesso', async function () {
    const resultSucess = {
      type: null, message: {
        id: 2,
        name: 'Traje de encolhimento'
      }
    }

    sinon.stub(productService, 'isValidIdProduct').resolves(resultSucess);

    const req = { params: { id: 2 } }

    const res = {}
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsControllers.findProductsById(req, res);

    expect(res.status).to.have.been.calledWith(200);
  });

  it('Verifica o retorno da função insertProduct do controller do products', async function () {
    sinon.stub(productService, 'isValidIdProduct').resolves();
    const req = { body: { name: 'Jóia do tempo' } }
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsControllers.insertProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
  });
  
  it('Verifica o retorno da função updateProduct do controller do product, caso a operação falhe', async function () {
    const resultFailled = { type: 'ID_NOT_FOUND', message: 'Product not found' }
    sinon.stub(productService, 'productForUpdate').resolves(resultFailled);

    const req = { params: { id: 9 }, body: { name: 'traje do batman' } }

    const res = {}
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsControllers.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(404);
  });

  it('Verifica o retorno da função updateProduct do controller do products, caso a operação seja um sucesso', async function () {
    const resultSucess = {
      type: null, message: {
        id: 2,
        name: 'traje do batman'
      }
    }

    sinon.stub(productService, 'productForUpdate').resolves(resultSucess);

    const req = { params: { id: 9 }, body: { name: 'traje do batman' } }

    const res = {}
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsControllers.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(200);
  });








  it('Verifica o retorno da função deleteOneProduct do controller do product, caso a operação falhe', async function () {
    const resultFailled = { type: 'ID_NOT_FOUND', message: 'Product not found' }
    sinon.stub(productService, 'isValidIdProduct').resolves(resultFailled);

    const req = { params: { id: 9 } }

    const res = {}
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsControllers.deleteOneProduct(req, res);

    expect(res.status).to.have.been.calledWith(404);
  });

  it('Verifica o retorno da função deleteOneProduct do controller do products, caso a operação seja um sucesso', async function () {
    const resultSucess = {
      type: null, message: {
        id: 2,
        name: 'Traje de encolhimento'
      }
    }

    sinon.stub(productService, 'isValidIdProduct').resolves(resultSucess);

    const req = { params: { id: 2 } }

    const res = {}
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsControllers.deleteOneProduct(req, res);

    expect(res.status).to.have.been.calledWith(204);
  });  

  afterEach(function () {
    sinon.restore();
  });
});