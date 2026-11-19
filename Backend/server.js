require("dotenv").config();
const DB = require("./src/config/db.js")
const app = require("./src/app.js")
DB();


const PORT = process.env.PORT || 9696;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on ${PORT}`);
});
