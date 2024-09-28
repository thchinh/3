import express from 'express';
import userRepo from './utils/userRepository.js';
import path from 'path';
import { engine } from 'express-handlebars';

const app = express();

app.engine(
  'hbs',
  engine({
    extname: '.hbs',
  })
);
app.set('view engine', 'hbs');
app.set('views', 'src/views');

app.use(express.static(path.resolve('src/pubclic'))); /// static file
app.use(express.urlencoded({ extended: true })); // note
app.use(express.json());

// API endpoints
app.get('/api/users', async (req, res) => {
  const result = await userRepo.getUsers();
  res.send({
    data: result,
  });
});

app.post('/api/users', async (req, res) => {
  const result = await userRepo.createUser(req.body);

  if (result.affectedRows !== 0) {
    return res.status(201).send({
      message: 'User created successfully',
    });
  }

  res.statusCode(400).send({
    messsage: "Data can't insert into database",
  });
});

// Render view endpoints
app.get('/', async (req, res) => {
  const result = await userRepo.getUsers();
  res.render('home', { users: result });
});

app.listen(3000, (req, res) => {
  console.log('listening 3000');
});

// app.get('/', async (req, res) => {
//   const result = await userRepo.getUsers();
//   res.render('home', { users: result });
// });

// 500 => chet call
