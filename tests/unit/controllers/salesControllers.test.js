const sinon = require('sinon');
const chai = require('chai');

const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { expect } = chai;

const { salesService } = require('../../../src/services');

const { salesControllers } = require('../../../src/controllers');

const salesMock = require('../mocks/sales.mock');

describe('Testes referentes aos controllers da tabela sales', function () {

  it('Verifica o retorno da função findAllSales do controller do sales, caso a operação seja um sucesso', async function () {
    sinon.stub(salesService, 'findSales').resolves(salesMock);
    const res = {}
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesControllers.findAllSales({}, res);

    expect(res.status).to.have.been.calledWith(200);
  });

  it('Verifica o retorno da função findSalesById do controller do sales, caso a operação falhe', async function () {
    const resultFailled = { type: 'ID_NOT_FOUND', message: 'Product not found' }
    sinon.stub(salesService, 'isValidIdSale').resolves(resultFailled);

    const req = { params: { id: 1 } }

    const res = {}
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesControllers.findSalesById(req, res);

    expect(res.status).to.have.been.calledWith(404);
  });

  it('Verifica o retorno da função findSalesById do controller do sales, caso a operação seja um sucesso', async function () {
    const resultSucess = {
      type: null, message: {
        date: '2023-04-06T06:43:37.000Z',
        productId: 3,
        quantity: 15
      }
    }

    sinon.stub(salesService, 'isValidIdSale').resolves(resultSucess);

    const req = { params: { id: 2 } }

    const res = {}
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesControllers.findSalesById(req, res);

    expect(res.status).to.have.been.calledWith(200);
  });

  it('Verifica o retorno da função deleteSaleById do controller do sales, caso a operação falhe', async function () {
    const resultFailled = { status: 404, message: { message: 'Sale not found'} }
    sinon.stub(salesService, 'findSaleForDelete').resolves(resultFailled);

    const req = { params: { id: 9 } }

    const res = {}
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesControllers.deleteSaleById(req, res);
    expect(res.status).to.have.been.calledWith(404);
  });

  it('Verifica o retorno da função deleteSaleById do controller do sales, caso a operação tenha sucesso', async function () {
    const resultSucess = { status: 204, message: [{ saleId: 2, date: '2023-04-11T00:35:02.000Z', 'productId': 3, 'quantity': 15 }] }
    
    sinon.stub(salesService, 'findSaleForDelete').resolves(resultSucess);

    const req = { params: { id: 2 } }

    const res = {}
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesControllers.deleteSaleById(req, res);
    expect(res.status).to.have.been.calledWith(204);
  });

  it('Verifica o retorno da função insertSale do controllers do sales', async function () {
    const result = { status: 201, message: [{ productId: 1, quantity: 1 }, { productId: 2, quantity: 5 }] }
    sinon.stub(salesService, 'insertSales').resolves(result);

    const req = { body: [{ productId: 1, quantity: 1 }, { productId: 2, quantity: 5 }] };

    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesControllers.insertSale(req, res);
    expect(res.status).to.be.have.been.calledWith(201);
  });

  it('Verifica o retorno da função updateSales do controllers do sales', async function () {
    const resultService = { status: 200, message: { saleId: 1, itemsUpdated: [{ productId: 1, quantity: 100 }, { productId: 2, quantity: 50 }] } }
    sinon.stub(salesService, 'saleForUpdate').resolves(resultService);

    const req = { body: [{ productId: 1, quantity: 100 }, { productId: 2, quantity: 50 }], params: { id: 1 } }

    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesControllers.updateSales(req, res);
    expect(res.status).to.be.have.been.calledWith(200)
  });
  
  afterEach(function () {
    sinon.restore();
  });
});