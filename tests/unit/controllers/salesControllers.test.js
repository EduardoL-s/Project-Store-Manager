const sinon = require('sinon');
const chai = require('chai');

const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { expect } = chai;

const { salesService } = require('../../../src/services');

const { salesControllers } = require('../../../src/controllers');

describe('Testes referentes aos controllers da tabela sales', function () {

  it('Verifica o retorno da função findAllSales do controller do sales, caso a operação seja um sucesso', async function () {
    sinon.stub(salesService, 'isValidIdSale').resolves();
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
  
  

  afterEach(function () {
    sinon.restore();
  });
});