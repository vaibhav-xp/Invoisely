# MERN Stack with React Query, Tailwind CSS, JWT Token, and Express Validator

This project is a full-stack application utilizing the MERN stack (MongoDB, Express, React, Node.js) along with React Query for data fetching, Tailwind CSS for styling, JWT for secure authentication, and Express Validator for input validation. It features a user management and invoicing system.

## Frontend

### Routes

1. **User Registration**

   - **Path:** `/register`
   - **Description:** User registration page.

2. **User Login**

   - **Path:** `/login`
   - **Description:** User login page.

3. **Home Page**

   - **Path:** `/`
   - **Description:** Home page where the user can add products and view the history of invoices.

4. **Invoice Details**

   - **Path:** `/invoices/:_id`
   - **Description:** Page for viewing and printing a specific invoice.

5. **Log Out**
   - **Path:** Home page button
   - **Description:** Clicking on the logout button will log the user out.

## Backend

### API Endpoints

1. **User Registration**

   - **Path:** `/api/register`
   - **Method:** `POST`
   - **Description:** Endpoint for user registration.

2. **User Login**

   - **Path:** `/api/login`
   - **Method:** `POST`
   - **Description:** Endpoint for user login.

3. **Add Product**

   - **Path:** `/api/products/add`
   - **Method:** `POST`
   - **Description:** Endpoint for adding a product.

4. **View Invoices History**

   - **Path:** `/api/invoices`
   - **Method:** `GET`
   - **Description:** Endpoint for retrieving the history of invoices.

5. **View Invoice Details**
   - **Path:** `/api/invoices/:_id`
   - **Method:** `GET`
   - **Description:** Endpoint for retrieving details of a specific invoice.

### Middleware

1. **Authentication Middleware**
   - **Description:** Middleware to verify JWT token for protected routes.

### Dependencies

- **Express:** Backend web application framework.
- **Express Validator:** Middleware for input validation.
- **JWT (JSON Web Token):** For secure authentication.
- **Mongoose:** MongoDB object modeling tool.
- **bcrypt:** Library for hashing and salting passwords.

### Frontend Technologies

- **React:** JavaScript library for building user interfaces.
- **React Query:** For data fetching and state management.
- **Tailwind CSS:** Utility-first CSS framework.
- **React Toastify:** For displaying toast notifications.
- **axios:** HTTP client for making requests to the backend.

## Backend Setup

1. Install dependencies: `npm install`
2. Create `.env` file and add the variables mentioned in `.env.sample`
3. Run the development server: `npm run dev`

## Frontend Setup

1. Install dependencies: `npm install`
2. Create `.env` file and add the variables mentioned in `.env.sample`
3. Run the development server: `npm run dev`

## Note

- Ensure the backend server is running on the specified port.
- Update API endpoints and paths in the frontend accordingly.
