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

  async createUser(body) {
    const { id, firstName, lastName, email, age, phone } = body;

    // Validation

    const [result] = await db.query(
      'INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `age`, `phone`, `isActive`) VALUES(?, ?, ?, ?,?,?,?)',
      [
        id,
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
}

export default new UserRepository();
