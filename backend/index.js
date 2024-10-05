import express, { urlencoded } from "express";
import cors from "cors";
import api from "./routes/UserRoute.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(api);

app.listen(5000, () => console.log(`Server running on port 5000`));
