import axios from "axios";
const API_URL = "http://localhost:3001/pizzas";

class Pizzas {
  constructor(API_URL) {
    this.API_URL = API_URL;
  }

  async getAll() {
    try {
      const { data: pizzas } = await axios.get(this.API_URL);
      return pizzas;
    } catch (error) {
      console.log(error);
    }
  }

  async create(pizzaData) {
    try {
      const { data: createdPizza } = await axios.post(this.API_URL, pizzaData);
      return createdPizza;
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id) {
    try {
      await axios.delete(`${this.API_URL}/${id}`);
      return id;
    } catch (error) {
      console.log(error);
    }
  }

  async update(id, propsToUpdate) {
    try {
      const { data: updatedArticle } = await axios.put(
        `${this.API_URL}/${id}`,
        { ...propsToUpdate },
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      return updatedArticle;
    } catch (error) {
      console.log(error);
    }
  }
}

const pizzas = new Pizzas(API_URL);

export default pizzas;
