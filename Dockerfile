#FROM baseImage
#it will download latest version of node
FROM node

# set the working directory 
#all commands will be executed inside this directory
WORKDIR /app

COPY . /app
#Compile time command 
# RUN npm install
ARG NODE_ENV
RUN if [ "${NODE_ENV}" = "development" ]; then npm install; else npm install --only=production; fi

ENV PORT=3001
EXPOSE 3001
CMD ["node","server.js"]
# CMD ["npm","start"]
