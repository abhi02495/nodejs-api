import express from 'express';
import bodyParser from 'body-parser';
import itemRoutes from './routes/item.js'
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/cart', itemRoutes);

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
