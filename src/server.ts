import app from "./app.js";

const port = Number(process.env.PORT ?? 3000);

app.listen(port, () => {
  console.log(`Parking lot backend listening on port ${port}`);
});
