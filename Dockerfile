FROM node:latest
WORKDIR /app
COPY . /app/
RUN npm install
RUN npm run bootstrap
CMD ["npm", "run" ,"dock"]
