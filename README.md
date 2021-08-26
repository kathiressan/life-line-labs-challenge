# Overview
This web application is for the Life Line Labs technical assessment.
## Server
The server folder is the backend for this project. I used express and MongoDB to create an api to get users in the front-end. I recreated the api from 
[https://randomuser.me/](https://randomuser.me/). You can get all the users data from the MongoDB database by using the the api [https://lll-challenge-api.herokuapp.com/user](https://lll-challenge-api.herokuapp.com/user). The api is hosted on Heroku.

## Front-End
The actual application is hosted on Heroku as well, at [https://lll-challenge-app.herokuapp.com](https://lll-challenge-app.herokuapp.com). To log into the app, you can search for any username and password in the api I created. The api link is posted above. Once logged in, the app pulls all the user data from the api and is presented in a table. I have also implement pagination and the user can type the number of any page to look up as well. There is also a next and previous button that goes forward or backwards one page. Error checking is implemented for the input field. When a certain row is clicked on the table, a modal will appear with extra information about the user.

For your convenience, one of the valid login credentials is posted below:
Username: lazytiger930
Password: miracle
