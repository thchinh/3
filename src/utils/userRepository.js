import { connectToDatabase } from '../configDatabase.js';

// Connect to database
const db = await connectToDatabase();

class UserRepository {
  constructor() {
    this.db = db;
  }

  async getUsers() {
    const [result] = await this.db.query('SELECT * FROM users');
    return result;
  }

  async getUserById(id) {
    const [result] = await this.db.query('SELECT * FROM users WHERE id =?', [
      id,
    ]);
    return result[0];
  }

  async createUser(body) {
    const { firstName, lastName, email, age, phone } = body;

    const [result] = await db.query(
      'INSERT INTO `users` (`firstName`, `lastName`, `email`, `age`, `phone`, `isActive`) VALUES(?, ?, ?, ?,?,?)',
      [
        firstName,
        lastName,
        email, // Validate email
        age,
        phone, // Validate phone
        true,
      ]
    );
    return result;
  }

  async updateUser(body) {
    const { id, firstName, lastName, email, age, phone } = body;

    // Check existing user
    const existingUser = await this.getUserById(id);
    if (!existingUser) {
      throw new Error('User not found');
    }

    // update existing user
    const [updateResult] = await db.query(
      'UPDATE `users` SET `firstName` =?, `lastName` =?, `email` =?, `age` =?, `phone` =? WHERE `id` =?',
      [
        firstName,
        lastName,
        email, // Validate email
        age,
        phone,
        id,
      ]
    );
    return updateResult;
  }

  async deleteUser(id) {
    // Check existing user
    const existingUser = await this.getUserById(id);
    if (!existingUser) {
      throw new Error('User not found');
    }

    // Delete user
    const [deleteResult] = await db.query('DELETE FROM `users` WHERE `id` =?', [
      id,
    ]);
    return deleteResult;
  }
}

export default new UserRepository();
