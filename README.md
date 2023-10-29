# Darling Rodriguez & Lily Edelman - Software Engineering @ Wesleyan University

This is a full-stack application made under the course COMP333: Software Engineering. The idea of this project is to create an application where users can log in, upload songs, and rate them, as well as view songs rated by other users in the community. 

# Local Set Up

In order to run our application, you have to follow some steps to set up a local environment in terms of databases and servers.

## 1. XAMPP Set up

In order to set up databases, you need to install or have XAMPP in your local environment (Computer).[Here is where to download XAMPP](https://www.apachefriends.org/)

The first thing once XAMPP is downloaded and installed is turn the necessary servers on: MySQL Database & Apache Web Server. To do this, navigate to where XAMPP was installed, navigate to the XAMPP folder, and open the Manager. In MacOS it is called "manager-osx". Once there, start those two servers. 

## 2. phpMyAdmin Set Up

On a browser, open the [localhost/phpmyadmin/](http://localhost/phpmyadmin/) in order to access this database. Note that this often takes a while to open and load. 

Once open, to create the template database, [download this SQL file](./Other_Files/music_db_test.sql) on your computer. 

With that file downloaded, navigate to the "Import" section on the top bar of phpMyAdmin. Upload that SQL file that was just downloaded and import it. You should be able to see your new database with two tables: users and ratings.

## 3. XAMPP Backend files

With our database now set up, we can start getting our project files in the right location. Navigate inside your local XAMPP folder and open it. Once in, you should find a folder called 'htdocs'. Open this folder and delete everything except two folders: 'img' and 'dashboard'. 

After cleaning this 'htdocs' folder, create a folder for your backend files. It is important that you remember what you name this folder, as we will need its name to access it later on. 

Once you create a project folder, navigate inside it and copy and paste the folders from the repo called 'Model' and 'Controller' into this project folder. These are our backend RestApi files that follow the MVC (Model-View-Controller) pattern. For the 'View' we will focus on it later.

Inside the Model folder, you will find the database.php file, which is what connects these files to the database in phpMyAdmin that we made previously. If you made your own database or changed the name of the one we provided, make sure to reflect those name changes in this file, specifically on this line:

```php
$this->db = new mysqli('localhost', 'root', '', 'music_db_test');
```

If you renamed the database, replace 'music_db_test' with your new name. If you didn't, skip this step.


## ReactJS Set Up

Now that we have our backend files and database in our local environment, we want to focus on setting up our front end, specifically creating our React application.

We will begin by opening our terminal and navigating to any folder that we would like to store our application. This does NOT have to be inside our XAMPP folder, you can place this anywhere that you can access on your local computer folders.

Once you have navigated where you want to create your app, follow [these instructions](https://radixweb.com/blog/steps-to-build-react-project-with-create-react-app) to create your react app THROUGH STEP 2!!! 

Once you have created your react app, you can run it locally by doing this on your terminal command line:

```bash
npm start
```
Make sure that you are in the React App folder to run this!

Once you have this running smoothly, you can delete every single file under the 'src' folder in your React application. In our GitHub repo, inside the 'View' folder, we want to copy/paste or download all those files and place them inside this src folder. 

Once this is completed, go through all the files you downloaded into the src folder, and if you see any links that look like this:

```js
...axios...('http://localhost/hw-test/Controller/RestApi/User/read.php')...
```

It is crucial that you change that to the directory of that associated file. The 'http://localhost/' is referring to the XAMPP htdocs, so whatever you decide to call your backend files in the htdocs should be after.

For example, my folder is called hw-test and my 'Model' and 'Controller' folder are in there, so my link will then be ''http://localhost/hw-test/' and the path to whatever file I want to link will be after. 


# Running the Application

After following all those steps correctly, you can do:
```bash
npm start
```
and see a working application that you can use. If there are any errors, read what files and lines they are coming from and make sure you have linked everything correctly between the ReactJs files and the backend files in the htdocs folder of the XAMPP application folder.

