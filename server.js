const { db } = require("./db");
const app = require('./index.js');
const { sequelize } = require('./db');

const { PORT = 4000 } = process.env;

app.listen(PORT, () => {
  sequelize.sync({ force: false });
  console.log(`Users are ready at http://localhost:${PORT}`);
});