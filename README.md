# Avocati
**Table of Contents** 

* Welcome to Avocati
* Technologies Used
* Avocati Application architecture
* Front-end aspects
* Back-end aspects
* Conclusion

## Welcome to Avocati
* Avocati is a platform for users to openly express their ideas or share their experiences with a general audience and a vast amount of categories. On our full-stack application, users can post their own articles and publish them so that any other Avocati user can read or follow the publisher to stay updated with the favorite authors.
* Our application is made with an asynchronous javascript front-end, while our backend is led by our express server and Postgres database. 

## Key Features
* Create users and sign in/out
     * Customize user profile page
* Create stories
* Make comments on stories
* Like stories
* Follow and unfollow other users

## Technologies Used
* Frontend
  * Javascript
* Backend
  * Node.js
  * Express
  * PostgreSQL database
  * Heroku application platform

## Application Architecture

### Frontend Overview
The Avocati frontend was built entirely with vanilla JavaScript and CSS. We used a combination of form inputs and the Fetch API to provide a fully functional CRUD experience to our users. By utilizing Ajax we are also able to provide a seamlessly integrated experience to our users when they make comments, like stories, or follow other users.
### Backend Overview
The Express backend is a collection of frontend routes and RESTful API routes that serve data to the frontend through Pug.js templating. The application data is stored in a Postgres database. All backend CRUD operations are performed through our Node environment with Sequelize. 
## Conclusion
We intended to create a clone of Medium which is a site where you can post articles and engage in the community like many other social media platforms. We strived for a clean minimal look with high functionality. We learned a lot on the process and look forward to improving our design in the future.
  
