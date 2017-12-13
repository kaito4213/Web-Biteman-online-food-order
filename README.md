Biteman Online Food order Application
================

## Features
- Customers and restaurants sign up
- Customers and restaurants login / logout 
- restaurants upload and update the menu
- Search food and restaurants by type
- Food recommendation
- Order status management
- Profile management
---

## Technique stacks
We use REST API to design the web application, and use REACT in front-end, NODE for back-end and Mysql for database.


## How to start:
Notice: Do not install any dependencies in this project for now unless you can make sure you will not install duplicated pakages and will not cause package conflicts. If you really want to start something for testing you can start a new project yourself!
1. Go to the project directory, run ```npm install```
2. Start the project, run ```npm start```
3. Go to browser and visit ```localhost:3000```
---

## Validation
The overview of our client side design is shown below:
![desgin](https://github.com/kaito4213/biteman-online-food-order/blob/master/util/img/design.png)

Technique we use
![tech](https://github.com/kaito4213/biteman-online-food-order/blob/master/util/img/technique.png)

For database, we use following schema
![db](https://github.com/kaito4213/biteman-online-food-order/blob/master/util/img/Schema.png)

Here we used some screenshots to show the example runs of our demo. First, we can see the homepage of our website. The header is the navigation bar, and we can login in at the main component, otherwise we can click the sign up button to create a new customer account.
![home](https://github.com/kaito4213/biteman-online-food-order/blob/master/util/img/home.png)
In the example, we logged in using an existing customer account ‘tom’.
![cust](https://github.com/kaito4213/biteman-online-food-order/blob/master/util/img/custlogin.png)
Then in the Restaurant page, we can see different available restaurants. Another two components in this page is the search bar and recommendation boxes.
![rest](https://github.com/kaito4213/biteman-online-food-order/blob/master/util/img/select.png)
![rec](https://github.com/kaito4213/biteman-online-food-order/blob/master/util/img/recommendation.png)
By clicking the Go button besides each restaurant, we can see its menu and click ‘add’ button to add dishes to shopping cart correspondingly.
![menu](https://github.com/kaito4213/biteman-online-food-order/blob/master/util/img/menu.png)
In ‘Cart’, selected food can be deleted. By clicking the ‘Place’ button, all the food information will be taken out of table from the databases and grouped by restaurant ID to place multiple orders. However, different food from the same restaurant will be only placed as one order.
![cart](https://github.com/kaito4213/biteman-online-food-order/blob/master/util/img/cart.png)
Then we can see the order we placed is shown in the order list, with a status called ‘Placed’. At this moment, if you change your mind, you can just click ‘Cancel’ button to cancel the order, which means this order is invalid and you can do no more action on it. Otherwise, you can wait for the restaurant to accept and deliver the order, while the status will be changed by it and you can see where your order is in the process. After you got the food and the status of the order is
‘Delivered’, you can confirm the order by clicking the ‘Confirmed’ button and turn the status of the orders into ‘Finished’.
![order1](https://github.com/kaito4213/biteman-online-food-order/blob/master/util/img/order1.png)
![order](https://github.com/kaito4213/biteman-online-food-order/blob/master/util/img/order.png)


## Reference
Reactjs: 
https://facebook.github.io/react/  And we will use react-router to keep the UI in sync with the URL
https://github.com/ReactTraining/react-router/tree/v2.8.1/docs

Nodejs - express: we use this framework for server side
https://expressjs.com/







