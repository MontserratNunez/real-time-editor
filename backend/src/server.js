import express from "express";
import cors from "cors";
import records from "./routes/projects.js"

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/record", records);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})
