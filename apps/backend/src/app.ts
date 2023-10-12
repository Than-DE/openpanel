import express  from "express";
import events from './routes/events'
import profiles from './routes/profiles'
import { authMiddleware } from "./middlewares/auth";
import morgan from 'morgan'

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(morgan(':method :url :status :response-time ms'))
app.get("/", (req, res) => res.json("Welcome to Mixan"));
app.use(authMiddleware)
app.use('/api/sdk',events)
app.use('/api/sdk',profiles)
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});