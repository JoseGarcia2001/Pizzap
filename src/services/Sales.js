import axios from "axios";
const API_URL = "http://localhost:3001/sales";

class Sales {
  constructor(API_URL) {
    this.API_URL = API_URL;
  }

  async getAll() {
    try {
      const { data: sales } = await axios.get(this.API_URL);
      return sales;
    } catch (error) {
      console.log(error);
    }
  }

  async create(saleData) {
    try {
      const { data: createdSale } = await axios.post(this.API_URL, saleData);
      return createdSale;
    } catch (error) {
      console.log(error);
    }
  }
}

const sales = new Sales(API_URL);

export default sales;
