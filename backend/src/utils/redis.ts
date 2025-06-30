import { createClient } from 'redis';

const host = process.env.REDIS_HOST || 'cache'; // đảm bảo tên service trong Docker
const port = process.env.REDIS_PORT || '6379';

const redisClient = createClient({
  socket: {
    host,
    port: Number(port),
  },
});

redisClient.on('error', (err) => console.error('❌ Redis Client Error:', err));

(async () => {
  if (!redisClient.isOpen) await redisClient.connect();
})();

export default redisClient;
