#Base image taken from:https://github.com/cypress-io/cypress-docker-images
FROM cypress/included:latest
#Create the folder where our project will be stored
RUN mkdir /cypress-with-dockerr
#We make it our workdirectory
WORKDIR /cypress-with-dockerr
#Let's copy the essential files that we MUST use to run our scripts.
COPY package*.json ./
#####
RUN npm install
#####
COPY . .
#Executable commands the container will use[Exec Form]
ENTRYPOINT ["npx","cypress","run"]
#With CMD in this case, we can specify more parameters to the last entrypoint.
CMD [""]    