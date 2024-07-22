import express from 'express';
import liveUploadController from './controllers/liveTable.js';
const route = express.Router();

route.get('/api/getLiveData', liveUploadController.insertLiveData)

route.post('/api/getCryptoLiveData', liveUploadController.getCryptoLiveData)

export default route;