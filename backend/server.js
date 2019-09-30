import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
// import mysql from 'mysql';

const app = express();

app.use(cors());
app.use(bodyParser.json());

const categoriesRouter = require('./routes/categories.js');
app.use('/api/categories', categoriesRouter);

const productsRouter = require('./routes/products.js');
app.use('/api/products', productsRouter);

const ordersRouter = require('./routes/orders.js');
app.use('/api/orders', ordersRouter);

const searchRouter = require('./routes/search.js');
app.use('/api/search', searchRouter);

const productDetailsRouter = require('./routes/product-details.js');
app.use('/api/details', productDetailsRouter);

const detailImagesRouter = require('./routes/details-images.js');
app.use('/api/detailsImages', detailImagesRouter);


app.get('/', (req, res) => res.send('Hello World!'));
app.listen(4000, () => console.log(`Express server running on port 4000`))

// const carRouter = require('./routes/car.js');
// const bookingRouter = require('./routes/booking.js');
// const languageRouter = require('./routes/language.js');

// const db = mongoose.connect('mongodb://localhost:27017/rental', { useNewUrlParser: true });

// // app.use('/api/*', cors());
// app.use('/uploads', express.static('uploads'));
// app.use('/api/cars', carRouter);
// app.use('/api/booking', bookingRouter);
// app.use('/api/language', languageRouter);
// app.use('/', express.static(path.join(__dirname, '/client/dist')));

// app.get('*', function(req, res) {
//   res.sendFile(path.join(__dirname, '/client/dist/index.html'));
// });

// app.listen(5656, () => {
//   console.log('http://localhost:5656')
// });