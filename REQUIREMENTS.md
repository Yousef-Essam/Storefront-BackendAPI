# API Requirements
Note that in endpoints where tokens are required, the token is sent on user creation and authentication and must be supplied in an `Authorization` header of the request with a `Bearer` method

## API Endpoints
#### Products
- Index (Show All Products): accessed via a `GET` request to `/products`
- Show (Show a certain product): accessed via a `GET` request to `/products/:id`. `id` is the id of the product you are looking for.
- Create (Create a new product) [token required]: accessed via a `POST` request to `/products`. The request body must be a json object which must contain 3 keys: `name`, `price` and `quantity`.
- Top products (The most ordered products/The products which were found in the largest number of orders): accessed via a `GET` request to `/products/top/:num`. `num` is the number of top products to show. For example: A GET request to `/products/top/5` will get the top 5 products.
- Products by category: accessed via a `GET` request to `/products/category/:cat`. `cat` is the category of the product you are looking for.

#### Users
- Index (Show All Users) [token required]: accessed via a `GET` request to `/users`
- Show (Show a certain user) [token required]: accessed via a `GET` request to `/users/:id`. `id` is the id of the user you are looking for.
- Create (Sign Up and Create new user): accessed via a `POST` request to `/users`. The request body must be a json object which must contain 3 keys: `firstname`, `lastname` and `password`. The `password` must be at least 6 characters.
- Authenticate (Sign in as a user with certain credentials): accessed via a `POST` request to `/users/auth`. The request body must be a json object which must contain 3 keys: `firstname`, `lastname` and `password`.

#### Orders
In this endpoint, the user id is needed for permission of access of certain operations. This id is extracted from the authorization token. Accessing orders, adding to them and finishing them are only permissible if this order belongs to this user.
- Active Orders by user [token required]: accessed via a `GET` request to `/orders/active`.
- Complete Orders by user [token required]: accessed via a `GET` request to `/orders/complete`.
- Show Order Details [token required]: accessed via a `GET` request to `/orders/:order_id`. `order_id` is the id of the order that the user desires to see its details.
- Create Order [token required]: accessed via a `POST` request to `/orders/create`. The request body must be a json object with a `products` key which is an arrays of `product` objects. `product` objects contain two keys which are `product_id` and `quantity`.
- Add products to order [token required]: accessed via a `POST` request to `/orders/:order_id`. `order_id` is the id of the order to which the user is adding products. The request body must be a json object with a `products` key which is an arrays of `product` objects. `product` objects contain two keys which are `product_id` and `quantity`.
- Finish order (Change its status to complete) [token required]: accessed via a `GET` request to `/orders/:order_id/finish`. `order_id` is the id of the order that the user desires to finish.

## Data Shapes
#### Product
- Table: products (
    id:serialPrimaryKey,
    name:varchar,
    price:float (must be a positive number), 
    category:varchar
)

#### User
- Table: users (
    id:serialPrimaryKey,
    firstname:varchar,
    lastname:varchar, 
    password:varchar
)

#### Orders
- Table: users (
    id:serialPrimaryKey,
    user_id:[Foreign key that references the id in the users table],
    status:'active' or 'complete'
)

#### Orders-Products
- Junction Table to relate the two tables orders and products that are related in a many to many relationship
- Table: orders_products (
    order_id:[Foreign key that references the id in the orders table],
    product_id:[Foreign key that references the id in the products table],
    quantity:integer
)

## Models
- The models are created in a somewhat different manner than the manner outlined in the course. They are created to mirror the CRUD operations. With that the model contains 4 methods: 
- `create` which takes an object of type of the data outlined in the schema.
- `read` which takes two parameters: either '*' which is the default value of the paramter or an array of the columns to read, and an optional filter object. This is created to mirror the `SELECT column1, column2 FROM table WHERE filter` SQL query.
- `update` which takes two parameters: an object with the new values to update, and an optional filter object. This is created to mirror the `UPDATE table set col1=val1 WHERE filter` SQL query.
- `delete` which takes a parameter: an optional filter object. This is created to mirror the `DELETE FROM table WHERE filter` SQL query.