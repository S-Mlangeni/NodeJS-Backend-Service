# Service Details

## Using and testing the service locally
1.	Clone the repository from the GitHub repository.
2.	Run “npm install” to install the dependencies in the package.json file
3.	Create a .env file in the root directory and, inside the file, set the following environment variables according to your local machine and MySQL database:
PORT =?
DB_USER =?
DB_PASSWORD =?
DB_NAME =?
DB_HOST =?
4.	Run “npx sequelize-cli db:seed:all” to seed the user details in the database.

To test the service, run the service using “node app” and then use an API platform like Postman to connect to the endpoints of the service. To check if you can watch a video, send a post request to “http://localhost:PORT*/video-api/watch-video” with an object body containing the following properties:
"user_email": "admin@gmail.com"
"user_password": "pass123"
The service will respond with an object with properties that can be used to determine if the user can watch a video and that the video watch limit of 3 is not exceeded based on the number of requests made to the service (i.e. number of requests made = number of attempts to watch a new video). To close video/s, send a post request to “http://localhost:PORT*/video-api/close-video” with the same object body as before containing the same properties. The service will respond with an object with properties confirming whether the video has been closed successfully.

*: Port number in .env file

## Scaling the service
The service uses an MVC architectural pattern which will allow the code to be easily and efficiently reused when scaling. Also, since the MVC architectural pattern decouples the software components, debugging will be easier as the software scales. When scaling to millions of users, the relational or SQL database used can be easily switched out for a non-relational or NoSQL database (which scales relatively easier and faster), thus more data can be handled and stored.

## Future work
Run unit tests using the testing frameworks Jest and Supertest. Create a streaming service that will connect to this checking service and authenticate users. Deploy the service with its client and database using a cloud platform. 