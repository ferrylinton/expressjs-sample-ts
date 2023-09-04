import { address } from 'ip';
import app from './app';
import { PORT } from './configs/constant';


app.listen(parseInt(PORT), () => {
  console.log(`[SERVER] Server is running at 'http://${address()}:${PORT}'`);
});
