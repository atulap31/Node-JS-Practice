import ExpenseRepository from "./expense.repository.js";

export default class ExpenseController {
  constructor() {
    this.expenseRepository = new ExpenseRepository();
  }

  // Create new expense
  add = async (req, res) => {
    try {
      const expense = req.body;

      const result = await this.expenseRepository.addExpense(expense);
      res.status(201).send(result);
    } catch (err) {
      res.status(400).send("Error adding expense");
    }
  };

  // Get a specific expense
  getOne = async (req, res) => {
    try {
      const id = req.params.id;

      const expense = await this.expenseRepository.getOne(id);
      if (!expense) {
        return res.status(404).send("Expense not found");
      }

      res.status(200).send(expense);
    } catch (err) {
      res.status(400).send("Error fetching expense");
    }
  };

  // Get all expenses
  getAll = async (req, res) => {
    try {
      const expenses = await this.expenseRepository.getAllExpenses();
      res.status(200).send(expenses);
    } catch (err) {
      res.status(400).send("Error fetching expenses");
    }
  };

  // Add a tag to an expense
  addTag = async (req, res) => {
    try {
      const id = req.params.id;
      const { tag } = req.body;

      await this.expenseRepository.addTagToExpense(id, tag);
      res.status(200).send("Tag added successfully");
    } catch (err) {
      res.status(400).send("Error adding tag");
    }
  };

  // Filter expenses
  filter = async (req, res) => {
    try {
      const result = await this.expenseRepository.filterExpenses(req.query);
      res.status(200).send(result);
    } catch (err) {
      res.status(400).send("Error filtering expenses");
    }
  };
}