FROM node:21-bullseye-slim

ENV DATABASE_URL=${DATABASE_URL}
ENV PORT=${PORT}

WORKDIR /

COPY package*.json ./
COPY . .
ADD prisma .

RUN npm ci
RUN npm run build
RUN npx prisma migrate deploy

EXPOSE ${PORT}

CMD ["npm", "start"]
