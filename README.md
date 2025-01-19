# Youtube Blog

This is a Node.js-based blogging platform where users can sign up, sign in, create blogs, and comment on blogs. The application uses MongoDB for data storage and JWT for authentication.

## Features

- User authentication (sign up, sign in, sign out)
- Create, read, update, and delete blogs
- Comment on blogs
- User roles (USER, ADMIN)

## Installation

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd Youtube Blog
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add the following environment variables:
    ```env
    MONGO_URL=<your-mongodb-url>
    PORT=<your-port>
    ```

4. Start the application:
    ```sh
    npm start
    ```

## Project Structure

- `app.js`: The main entry point of the application.
- `routes/`: Contains route handlers for user and blog-related endpoints.
- `models/`: Contains Mongoose models for User, Blog, and Comment.
- `services/`: Contains authentication-related services.
- `middleware/`: Contains middleware for authentication.
- `views/`: Contains EJS templates for rendering HTML pages.
- `public/`: Contains static files like CSS, JS, and images.

## Routes

### User Routes

- `GET /user/signin`: Render the sign-in page.
- `POST /user/signin`: Handle user sign-in.
- `GET /user/logout`: Handle user logout.
- `GET /user/signup`: Render the sign-up page.
- `POST /user/signup`: Handle user sign-up.

### Blog Routes

- `GET /blog/add-new`: Render the add new blog page.
- `GET /blog/:id`: View a specific blog.
- `POST /blog/comment/:blogId`: Add a comment to a blog.
- `POST /blog/`: Create a new blog.

## Middleware

### Authentication Middleware

- `checkForAuthentication(cookieName)`: Middleware to check for user authentication using JWT.

## Models

### User Model

- `fullName`: String, required
- `email`: String, required, unique
- `salt`: String
- `password`: String, required
- `profileImageURL`: String, default: "/images/default.jpeg"
- `role`: String, enum: ["USER", "ADMIN"], default: "USER"

### Blog Model

- `title`: String, required
- `body`: String, required
- `coverImageURL`: String
- `createdBy`: ObjectId, ref: "user"

### Comment Model

- `content`: String, required
- `blogId`: ObjectId, ref: "blog"
- `createdBy`: ObjectId, ref: "users"

## License

This project is licensed under the MIT License.
