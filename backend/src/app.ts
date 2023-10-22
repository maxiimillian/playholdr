import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import auth from './routes/auth';
import meta from './routes/meta/meta';
import advent from './routes/advent';
import codex from './routes/codex';
import middlewares from './middleware';
const app = express();

app.use(
  cors({
    origin: '*',
  }),
);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

middlewares.forEach(middleware => {
  app.use(middleware);
});

app.use('/auth', auth);
app.use('/meta', meta);
app.use('/advent', advent);
app.use('/codex', codex);

app._router.stack.forEach(function (r: any) {
  if (r.route && r.route.path) {
    console.log(r.route.path);
  }
});

app.get('/', (req, res) => {
  res.status(200).json({ success: true });
});

export default app;
