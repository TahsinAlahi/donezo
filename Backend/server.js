const app = require("./app");
const port = process.env.PORT || 3001;
const { client } = require("./database");

client
  .connect()
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server running on port http://localhost:${port}`);
    });
  })
  .catch(() => {
    console.log("Error connecting to MongoDB");
  });
