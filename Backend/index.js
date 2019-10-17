import app from "./app";


// Port to listen on. 
const Port = process.env.BACKEND_HOST
app.listen(Port, () => {
    console.log(`listening on ${Port}`);
  });