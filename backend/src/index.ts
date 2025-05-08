import 'dotenv/config';
import { connectDB, closeDB } from '@/config/db';
import { createServer } from '@/server';
import { startApolloServer } from '@/config/apollo';

async function startServer() {
  const { app, httpServer } = createServer();

  try {
    await connectDB();
    await startApolloServer(app, httpServer);

    const port = process.env.PORT || 4000;
    await new Promise((resolve) => httpServer.listen({ port }, resolve as () => void));
    console.log(`🚀 Server ready at http://localhost:${port}`);

    process.on('SIGINT', gracefulShutdown);
    process.on('SIGTERM', gracefulShutdown);
  } catch (err) {
    console.error('Server startup error:', err);
    process.exit(1);
  }
}

function gracefulShutdown() {
  closeDB().then(() => process.exit(0));
}

startServer();