#!/bin/sh

npx prisma migrate dev --name init
npx prisma generate
npx prisma db seed
node dist/index.js