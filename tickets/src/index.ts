import app from "./app";
import startDatabase from "./db/db";

const port = 8081;

const startServer = async () => {
  try {
    await startDatabase();
    app.listen(port, () => {
      console.log(`server is running on port : ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
