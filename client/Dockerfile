FROM node

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app
# COPY yarn.lock /app
COPY . /app

ENV PATH /app/node_modules/.bin:$PATH

RUN yarn install

CMD ["yarn", "start"]
# RUN npm install --silent
# RUN npm install react-scripts -g

# CMD ["npm", "start"]