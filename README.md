# Community-forum
## A community discussion forum using node.js

## It is a community discussion forum where the user can create an account, ask questions, answer to other people's questions, get badges and Much More!
## The technologies used in it are:-
## 1. Express.js: It is a node.js framework used to simplify building server side applications
## 2. Mongoose: It is a node.js framework which helps to easily communicate with the mongoDB Database
## 3. MongoDB: It is a Non SQL Database system. It is based on the bson data structure which is very similar to json. For the production database we have used a Free tier MongoDB Atlas Version
## 4. Handlebars: It is a server side template engine used to build dynamic web apps and is very similar to HTML with additional features
## 5. JSON Web Token: Json Web Token or better known as JWT is a technology used for user authentication and secure data storage
## 6. BcryptJS: It is a js framework mainly used to convert password strings into hashes for secure storage in the database
## Along with all this, the main languages in this web app are JavaScript(For both frontend and backend),HTML(as hbs rendered by the backend) and CSS(For frontend styling)

## to start please install the required packages using the following command
```sh
 npm install
```
## Then create a .env file to store your mongodb url, jwt key and port. like this:-
```.env
 DB= your_db_path
 SECRET_KEY= your_secret_jwt_key_for_user_authentication
 PORT=port_for_your_node_server
```
## Then you need to install nodemon globally on your pc using the following command:-
```sh
 npm i nodemon -g
```
## If you are on Mac or Linux, use the prefix 'sudo':
```sh
 sudo npm i nodemon -g
```
## Then finally run the following command:
```sh
 npm run start
```
## And You have a working forum web app!

### Note: If for some reasons you are unable to run nodemon, just run the following command:
```sh
node src/app.js
```
### But you would have to retype the command everytime some changes are done to the files.

### The original idea was from [Qbonanza.com](https://github.com/KartikeyKakaria/Qbonanza.com)