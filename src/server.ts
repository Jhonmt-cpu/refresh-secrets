import { app } from "./app"
import { SynchronizeCacheJob } from "./modules/auth/use-cases/synchronize-cache/synchronize-cache.job";
import { AppDataSource } from "./shared/database/data-source";
import { scheduleJob } from 'node-schedule';

AppDataSource.initialize().then(() => {
  console.log("Database initialized");

  const synchronizeCacheJob = new SynchronizeCacheJob();

  synchronizeCacheJob.execute();
});

app.listen(3333, () => console.log("Server is running on port 3333"));

scheduleJob('0 0 * * *', async () => {
  console.log("Synchronizing cache");

  const synchronizeCacheJob = new SynchronizeCacheJob();

  await synchronizeCacheJob.execute();

  console.log("Cache synchronized");
});
