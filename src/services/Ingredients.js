import axios from "axios";
const API_URL = "http://localhost:3001/ingredients";

class Ingredients {
  constructor(API_URL) {
    this.API_URL = API_URL;
  }

  async getAll() {
    try {
      const { data: ingredients } = await axios.get(this.API_URL);
      return ingredients;
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
      const { data: deletedArticle } = await axios.delete(`${this.API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      return deletedArticle;
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

const ingredients = new Ingredients(API_URL);

export default ingredients;
