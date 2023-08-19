# About this Project
- Create Front End For Blog Site

## To start this Project
> docker build . -t blogfrontend:dev

> docker run -it --name blogfrontend --rm -v ${PWD}:/app -v /app/node_module -p 3001:3000 -e CHOKIDAR_USEPOLLING=true blogfrontend:dev