import express from 'express';
import userRepo from './utils/userRepository.js';
import path from 'path';
import { engine } from 'express-handlebars';
// import multer from 'multer';

const app = express();
// const upload = multer();

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

app.put('/api/users', async (req, res) => {
  const result = await userRepo.updateUser(req.body);

  if (result.affectedRows !== 0) {
    return res.status(201).send({
      message: 'User updated successfully',
    });
  }

  res.statusCode(400).send({
    messsage: "Data can't insert into database",
  });
});

app.delete('/api/users/:id', async (req, res) => {
  const result = await userRepo.deleteUser(req.params.id);

  if (result.affectedRows !== 0) {
    return res.status(201).send({
      message: 'User DELETED successfully',
    });
  }

  res.statusCode(400).send({
    messsage: "Data can't insert into database",
  });
});

// Render view endpoints
app.get('/add-user', async (req, res) => {
  res.render('users/addUser');
});

app.get('/', async (req, res) => {
  const result = await userRepo.getUsers();
  res.render('home', { users: result });
});

app.listen(3000, (req, res) => {
  console.log('listening http://localhost:3000');
});
