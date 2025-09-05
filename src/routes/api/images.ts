import express from 'express';

const images = express.Router();

images.get('/', (req: express.Request, res: express.Response): void => {
  res.send('Images API route');
});

export default images;
