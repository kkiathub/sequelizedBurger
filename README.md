# sequelizedBurger

### Overview
This is a full-stack website that allow you to create burger logger with MySql. It utilizes MVC architecture whic allows source code and data to be accessed and used effectively.

### How to use
    - User can add burger with Add Burger button.
    - Once the new entry of burger is added, it will be displayed on the left side of the screen along with "Devour it" button.
    - User click 'Devour it' button, then he will be asked to enter his name also, rate the burger.  Then, the devoured burger will be moved to the right side along with the user name and its rating.
    - User can sort the burgers by options offer on 'Order by' radio boxes.

### Note
    - There is no option to delete burger entries at the moment.  Once the burgers is filling up the screen, the scrollbar will appear.  
    
### In the code...
    - We use node.js and javascript in coding.
    - Express package is used to send request and received response.  In this project, server sends back html page to the client.
    - The express-handlebars is used to render html pages. 
    - We register extra handlebars' helper to help rendering some conditional data.
    - Burger data is stored in the database.  We use MySql as a database.
    - We use sequelize to manipulate data from database.
    - We use MVC architecture to separate code and data in different layers.  

### Credit
Kanwee Kiatnikorn : Design, Coding, and Testing.