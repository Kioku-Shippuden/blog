FROM node:19

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY . ./
RUN npm install 
RUN npm run build 

EXPOSE 3001


CMD [ "serve", "s", "build", "-l", "3001" ]