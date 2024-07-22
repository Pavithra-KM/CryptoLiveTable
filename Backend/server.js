import express from 'express';
import bodyParser from 'body-parser';
import './dbconnection.js';
import route from './routes.js';

const app = express()
const port = 2605;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', route);

app.listen(port, () => {
    console.log('listening on '+port)
})