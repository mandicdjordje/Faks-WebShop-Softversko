const {
  getAllProduct,
  getProductFromId,
} = require('../../controllers/productController');

const db = require('../../models/index');

// mokovacemo celu bazu da pravimo lazne pozive
// zelimo testove u izolaciji da izbegnemo pozive ka pravoj bazi
// zarad stabilnosti testova
jest.mock('../../models/index', () => ({
  product: {
    findOne: jest.fn(),
    findAll: jest.fn(),
  },
}));

describe('Product controller > ', () => {
  let mockedRequest, mockedResponse;

  // pre svakog testa restartuj mokovane zahteve
  beforeEach(() => {
    mockedRequest = {
      params: {
        product_id: 1,
      },
    };
    mockedResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('vraca 404 ukoliko ne postoji produkt', async () => {
    // podesi bazu da vraca null uvek kad se poziva find one
    db.product.findOne.mockReturnValue(null);
    await getProductFromId(mockedRequest, mockedResponse);
    expect(mockedResponse.status).toHaveBeenCalledWith(404);
    expect(mockedResponse.json).toHaveBeenCalledWith({
      message: `Nema Produkta sa id_1`,
    });
  });

  it('vraca 200 ukoliko postoji produkt', async () => {
    const prozivod = {
      product_id: 3,
      productName: 'Ajvar',
      quantity: 22,
      price: 1200.2,
    };
    // podesicemo bazu da uvek vraca ovaj prozivod kada se pozove
    db.product.findOne.mockReturnValue(prozivod);
    await getProductFromId(mockedRequest, mockedResponse);
    // assert da je request.status pozvan sa 200
    expect(mockedResponse.status).toHaveBeenCalledWith(200);
    // assert da je request.json pozvan sa istim prozivodom
    expect(mockedResponse.json).toHaveBeenCalledWith({ product: prozivod });
  });

  it('vraca 201 kada pretrazi sve proizvode', async () => {
    const products = [
      {
        product_id: 2,
        productName: 'Kulen',
        quantity: 40,
        price: 1200.2,
      },
      {
        product_id: 3,
        productName: 'Ajvar',
        quantity: 50,
        price: 1201230.2,
      },
    ];
    // mokujemo bazu da uvek vrati ove prozivode
    db.product.findAll.mockReturnValue(products);
    // pozovemo funkciju
    await getAllProduct(mockedRequest, mockedResponse);
    // assert da je request.status pozvan sa 201
    expect(mockedResponse.status).toHaveBeenCalledWith(201);
    // assert da je request.json pozvan sa istima prozivodima
    expect(mockedResponse.json).toHaveBeenCalledWith({ proizvodi: products });
  });
});
