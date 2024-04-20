import { PrismaClient } from '@prisma/client';
import type { FastifyRequest } from 'fastify';
import fastify from 'fastify';

const prisma = new PrismaClient();
const app = fastify();

app.get('/', async () => {
  const notes = await prisma.note.findMany({
    take: 10,
  });

  return {
    notes,
  };
});

app.get('/health', async () => {
  return {
    status: 'ok',
  };
});

app.get('/count', async () => {
  const count = await prisma.note.count();
  return {
    count,
  };
});

app.post('/', async (request: FastifyRequest) => {
  const { name, note } = request.body as { name: string; note: string };

  await prisma.note.create({
    data: {
      name,
      note,
    },
  });

  return {
    message: 'Success',
  };
});

const port = process.env.PORT ? Number(process.env.PORT) : 3001;

app
  .listen({
    port: port,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log(`Server listening on http://0.0.0.0:${port}`);
  });
