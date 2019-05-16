import * as express from "express";

const PORT = process.env.PORT || 80;
const app = express();
app.use("/", express.static("dist"));
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
