# RetinoCare

A full-stack MERN project which predicts the stage of diabetic retinopathy using the Transfer Learning technique, the API of the trained model is implemented over a ReactJS application.
The API used in the project is available [here](https://github.com/sarthakk1890/DR_API)

**Note:** Before starting the backend server, replace the username and password from the [MongoDB database URL](https://github.com/sarthakk1890/RetinoCare-Application-for-Diabetic-Retinopathy-Detection-/edit/main/backend/db.js)

## Features
1. Login, Signup, and Logout
2. Password protection using hashing and salting
3. Drag and Drop functionality over the homepage
4. Saves history of the prediction if the user wants
5. Six results as saved history are allowed
6. Exceeding the saved history limit will result in automatically elimination of the oldest result
7. The result is served in a card format which displays the prediction result and the date when they were saved
8. Toast notifications during login, signup, logout, saving image, server error, and more are applied
9. Users can have access to their own history not of others
10. A unique token is saved to local storage during login/signup and is removed during logout

## Technologies
_**For Web**_
1. ReactJS framework
2. JavaScript
3. NodeJS
4. Express
5. MongoDB
6. CSS
7. Bootstrap
8. Cloudinary
   
_**For API**_
1. Python
2. Fast API

## Packages and Libraries
_**For Web**_
1.  Bcrypt
2.  Cors
3.  Express-validator
4.  Jsonwebtoken
5.  Mongoose
6.  React-router-dom
7.  React-toastify
   
_**For API**_
1.  Tensorflow
2.  Pandas
3.  Numpy
