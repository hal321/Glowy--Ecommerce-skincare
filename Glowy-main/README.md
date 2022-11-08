# Glowy
A full-stack ecommerce website using Nodejs,Express, and Mongoose
# Two main roles can display this page and each will have their own separate views:
# Admins View (Admins can control the User pages as well as the Products pages):
- Admins can add delete and update a specific user.
- Admins are the only one who can decide who will have an admin role. by defaule the role set to "Guest".
- Admins will have an admin button in the product page this will take them to admin page where they can see all their authorities.
- Admins can Add a new products as well as deleting or updating an existing one. 
- Users wont be able to see admin pages>
# Users View:
- Users neeed to register inorder for them to go to the products page.  
- Users can view all the products added by the admin.
- Users can add products to shopping basket.
- Users can remove products from the basket.
- Users can display the shopping basket.

#Database:
There are three main schemas in this project:
- BagSchema: this is a shopping basket bag that contains all the products chosen by the user.
- GlowySchema: this contains all the products details added by the admin.
- UserSchema:this contains all the users signed up to the page

#Link to the Site:
https://rocky-crag-94743.herokuapp.com/




