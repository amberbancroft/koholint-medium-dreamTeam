# Avocati
*By Amber Bancroft, Becky Chen, Justin Wong, and Owen Beckles - [Visit Avocati](https://avocati.herokuapp.com/)*

**Table of Contents**
* [Welcome to Avocati](#welcome-to-avocati)
* [Technologies Used](#technologies-used)
* [MVP Feature List](#mvp-feature-list)
* [Application Architecture](#application-architecture)
* [Database Schema](#database-schema)
* [Frontend Overview](#frontend-overview)
* [Backend Overview](#backend-overview)
* [Conclusion](#conclusion)

## Welcome to Avocati
Avocati (a [Medium](https://medium.com/) clone) is a platform for users to openly express their ideas or share their experiences with a general audience and a vast amount of categories. On our full-stack application, users can post their own articles and publish them so that any other Avocati user can read or follow the publisher to stay updated with the favorite authors.

## Technologies Used
* Frontend
    * Javascript
    * Pug.js
    * CSS
* Backend
    * Node.js
    * Express.js
    * PostgreSQL
    * Heroku Deployment

## MVP Feature List
* User Authentification
    * Sign Up/ Login
        
        Users have the ability to sign up for an account by inputing the requested credentials.
        
        ![Sign Up/Login](/images/AvocatiLoginSignUp.gif)
    * Demo User
        
        Upon arriving on the homepage, users have the option to click the "Demo" button to be instantly logged in as the default demo user. This demo account allows them to navigate the application and all of it's authenticated features without formally creating their own account.
        
        ![Demo User](/images/AvocatiDemoExample.gif)
* Stories
    * Creating Stories
        
        Authenticated users can create their own stories, allowing other users to browse their work. To create a story, you will be prompted to input a title, content, and an optional image url.
        
        ![Create Stories](/images/WriteThings.gif)
    * Editing Stories
    * Deleting Stories
* Story Comments
    
    Authenticated users have the ability to comment on any story they view. Comments created by the user are denoted by their username as well as the time the comment was produced.
    
    ![Comments](/images/CreatingComments.gif)
* Liking Stories
    
    Authenticated users can like their favorite stories by clicking the heart icon at the end of a story. Similar to [Medium](https://medium.com/), users are allowed to click the like button as many times as they please, and the like counter adjacent to the icon will render the change by incrementing the counter by one on each click.
    
    ![Likes](/images/LikingStuff.gif)
* Follow/Unfollowing Users
    
    Authenticated users have access to a personal profile which displays the users they follow and that follow them, as well as a link to all of their user stories, and an edit button that allows them to change specific infomation tied to their account that they initally inserted upon account creation.
    
    ![Following](/images/FollowingUsers.gif)

## Application Architecture

### Database Schema
![Database](/images/DatabaseSchema.png)

### Frontend Overview
The Avocati frontend was built entirely with vanilla JavaScript and CSS. We used a combination of form inputs and the Fetch API to provide a fully functional CRUD experience to our users. By utilizing Ajax we are also able to provide a seamlessly integrated experience to our users when they make comments, like stories, or follow other users.

### Backend Overview
The Express backend is a collection of frontend routes and RESTful API routes that serve data to the frontend through Pug.js templating. The application data is stored in a Postgres database. All backend CRUD operations are performed through our Node environment with Sequelize.

## Conclusion
We intended to create a clone of Medium which is a site where you can post articles and engage in the community like many other social media platforms. We strived for a clean minimal look with high functionality. We learned a lot on the process and look forward to improving our design in the future.

