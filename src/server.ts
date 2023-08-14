import { app } from "./app"
import { AppDataSource } from "./shared/database/data-source";

AppDataSource.initialize().then(() => console.log("Database is running"));

app.listen(3333, () => console.log("Server is running on port 3333"));
