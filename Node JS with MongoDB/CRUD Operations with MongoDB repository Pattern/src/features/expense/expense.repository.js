import { getDB } from "../../config/mongodb.js";
import { ObjectId } from "mongodb";

class ExpenseRepository {
  constructor() {
    this.collectionName = "expenses"; // name of the collection in mongodb
  }

  // Create a new expense
  async addExpense(expense) {
    try {
      const db = getDB();
      const collection = db.collection(this.collectionName);

      await collection.insertOne(expense);
      return expense;
    } catch (err) {
      console.log(err);
    }
  }

  // Get one expnese by its ID
  async getOne(id) {
    try {
      const db = getDB();
      const collection = db.collection(this.collectionName);

      return await collection.findOne({ _id: new ObjectId(id) });
    } catch (err) {
      console.log(err);
    }
  }

  // Get all expenses
  async getAllExpenses() {
    try {
      const db = getDB();
      const collection = db.collection(this.collectionName);

      const expense = await collection.find().toArray();
      return expense;
    } catch (err) {
      console.log(err);
    }
  }

  // Add tag to an expense
  async addTagToExpense(id, tag) {
    try {
      const db = getDB();
      const collection = db.collection(this.collectionName);

      await collection.updateOne({_id: new ObjectId(id)},{$push: {tag: {tag}}});
    } catch (err) {
      console.log(err);
    }
  }

  // Filter expenses based on date, amount, and isRecurring field
  async filterExpenses(criteria) {
    try {
      const db = getDB();
      const collection = db.collection(this.collectionName);
      let filter = {};
      if (criteria) {
        filter.criteria = criteria;
      }

      return await collection.find(filter).toArray();
    } catch (err) {
      console.log(err);
    }
  }
}

export default ExpenseRepository;
