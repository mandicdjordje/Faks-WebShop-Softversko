const {
  getAllProduct,
  getProductFromId,
} = require("../../controllers/productController");

const db = require("../../models/index");

jest.mock("../../models/index", () => ({
  product: {
    findOne: jest.fn(),
    findAll: jest.fn(),
  },
}));

describe("Product controller > ", () => {
  let mockedRequest, mockedResponse;

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

  it("vraca 404 ukoliko ne postoji produkt", async () => {
    db.product.findOne.mockReturnValue(null);
    await getProductFromId(mockedRequest, mockedResponse);
    expect(mockedResponse.status).toHaveBeenCalledWith(404);
    expect(mockedResponse.json).toHaveBeenCalledWith({
      message: `Nema Produkta sa id_1`,
    });
  });

  it("vraca 200 ukoliko postoji produkt", async () => {
    const prozivod = {
      product_id: 3,
      productName: "Ajvar",
      quantity: 22,
      price: 1200.2,
    };

    db.product.findOne.mockReturnValue(prozivod);
    await getProductFromId(mockedRequest, mockedResponse);

    expect(mockedResponse.status).toHaveBeenCalledWith(200);

    expect(mockedResponse.json).toHaveBeenCalledWith({ product: prozivod });
  });

  it("vraca 201 kada pretrazi sve proizvode", async () => {
    const products = [
      {
        product_id: 2,
        productName: "Kulen",
        quantity: 40,
        price: 1200.2,
      },
      {
        product_id: 3,
        productName: "Ajvar",
        quantity: 50,
        price: 1201230.2,
      },
    ];

    db.product.findAll.mockReturnValue(products);

    await getAllProduct(mockedRequest, mockedResponse);

    expect(mockedResponse.status).toHaveBeenCalledWith(201);

    expect(mockedResponse.json).toHaveBeenCalledWith({ proizvodi: products });
  });
});
