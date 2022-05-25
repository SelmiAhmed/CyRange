FROM node:14.17.0
WORKDIR /Client
RUN npm install

ENV PATH="./node_modules/.bin:$PATH"
COPY . .
RUN npm run build
CMD ["npm","start"]
