import express from 'express';
import routes from './routes/index';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use('/api', routes);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
export default app;
