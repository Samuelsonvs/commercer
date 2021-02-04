// import data from './data.js';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
import orderRouter from './routers/orderRouter.js';

dotenv.config();


// const API = process.env.NODE_ENV === 'production'
// ? 'https://serene-noether-85f6ab.netlify.app/api' 
// : 'http://localhost:5000/api';
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/amazon', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});



// app.get('/api/products/:id', (req, res) => {
//     const product = data.products.find( x => x._id === req.params.id);
//     if(product) {
//         res.send(product);
//     } else {
//         res.status(404).send({message: 'Product not Found'});
//     }
// });

// app.get('/api/products', (req, res) => {
//     res.send(data.products);
// });

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);

// app.get('/', (req, res) => {
//     res.send('Server is ready');
// });

app.get('/api', (req, res) => {
    console.log("get apiden")
})

app.use((err, req, res, next) =>{
    res.status(500).send({message: err.message});
});

app.listen(PORT, () => {
    console.log('Serve at http://localhost:5000');
});
