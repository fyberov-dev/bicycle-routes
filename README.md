# jalgrattateed
 
## About the project

My project that I've made as the school project in 2022.
Most of the project I left as it was but added some small changes.
Project is about the bicycle routes in the Tallinn.

## Key features

* [NoSQL database (MongoDB)](#mongodb)
* [Admin panel](#admin-panel)
* Add images to the gallery (Should be confirmed by admin first to show in the gallery)
* Images confirmation
* Leave feedback (only Admins can read)
* Two languages (estonian/russian)
* [Lazy loading](#lazy-loading)

## Stack

### Frontend

* [Handlebars](https://handlebarsjs.com/)

### Backend

* [Node.js](https://nodejs.org/)
* [Express.js](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [Mongoose](https://www.npmjs.com/package/mongoose)
* [Multer](https://www.npmjs.com/package/multer)
* [Sharp](https://www.npmjs.com/package/sharp)
* [Helmet](https://www.npmjs.com/package/helmet)
* [bcryptjs](https://www.npmjs.com/package/bcryptjs)

## MongoDB

For the small project I've chosen the MongoDB.

### Installation

First of all, you need to create an account on the [MongoDB website](https://www.mongodb.com/) if you haven't already done.

After that create new project and new database cluster.

Add connection string to the [.env file](dotenv) in the project

## dotenv

Without the [.env](.env) file the project won't work.
Add .env file in the root folder of the project

_.env_

```env
MONGODB_URI=[YOUR_MONGODB_CONNECTION_STRING]
SESSION_SECRET=[SECRET_VALUE_FOR_SESSIONS]
```

## Admin panel

When the project is runned for the first time, a new administrator with the username "Admin"_(case-sensitive)_ and password "Admin" will be automatically created. So, you can access the admin panel and create a new admin account from there. To delete this 'Admin' account you need to log into MongoDB and delete it from there. And give creator priviligies to the newly created admin account

## Lazy Loading

### Problem

If you open the gallery, the page will take more than 1 minute to load. No one will wait that long and leave the page

### Solution

To fix the problem, I added simple lazy loading to the images. At first, when you add an image, it is saved in 2 formats. First format is a slightly compressed image and the second format is highly compressed image that will load first and then when the main image is fully loaded, it will replace the highly compressed image. So, the page will load quickly and the user will see that the content exists on this page, but it is loading at the moment.

## Run the project

### Install dependencies

```shell
npm i
```

### Run in dev

```shell
npm run dev
```

### Run in prod

```shell
npm run start
```