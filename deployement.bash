#!bin/bash

# Script pour automatiser la mise en production

cd frontend || exit
npm run build
cd ..
rm -r backend/public/*
cp -r frontend/build/* backend/public/
vercel deploy --prod