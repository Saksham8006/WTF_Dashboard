const express = require("express")
const port = 3002;
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose")
const routes = require("./routes")
const cors = require("cors")
app.use(morgan("tiny"))
app.use(cors());
app.use(express.json());
app.use(routes)


mongoose.connect("mongodb://localhost:27017/wtf-dashboard", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to database"))
  .catch((err) => {
    console.log("NO connection", err.message);
  });

app.get("/test", (req, res) => {
  res.send("I can fetching data.....")
})



app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})

