import mysql from 'mysql2/promise';

async function connectToDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: '127.0.0.1',
      user: 'root',
      password: 'Ekycthc@123',
      database: 'demo_nodejs',
    });
    console.log('Connected to database!');
    return connection;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  }
}

export { connectToDatabase };
