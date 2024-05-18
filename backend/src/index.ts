import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import employeeRoutes from './routes/employee';


const app = express();
const PORT = process.env.PORT || 3333;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/employees')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


app.get('/', (req, res) => {
  res.send({status: 'UP'});
})

app.use('/api/employees', employeeRoutes);
  
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
