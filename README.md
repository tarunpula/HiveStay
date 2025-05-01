# Project Title

A brief description of your project. Based on the files, it seems to be a web application for managing listings, reviews, and users, possibly involving maps and image uploads.

## Features

*   User authentication (signup, login)
*   Listing management (create, read, update, delete)
*   Review system for listings
*   Image uploads (likely via Cloudinary)
*   Map integration (likely via Mapbox)

## Technologies Used

*   Node.js (v23.7.0)
*   Express.js
*   Mongoose (for MongoDB interaction)
*   EJS (Templating engine)
*   ejs-mate (Layouts for EJS)
*   Passport.js (Authentication)
*   Cloudinary (Image storage)
*   Mapbox SDK (Maps)
*   connect-flash (Flash messages)
*   express-session (Session management)
*   method-override (HTTP method override)
*   Joi (Schema validation)
*   dotenv (Loading environment variables)

## Setup

To get this project up and running locally, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd <repository_folder>
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or yarn install
    # or pnpm install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the root directory of the project. You will need to configure variables for:
    *   Database connection (e.g., `DB_URL`)
    *   Cloudinary credentials (e.g., `CLOUD_NAME`, `CLOUD_API_KEY`, `CLOUD_API_SECRET`)
    *   Mapbox access token (e.g., `MAPBOX_TOKEN`)
    *   Session secret (e.g., `SESSION_SECRET`)

    Example `.env` file:

    ```env
    DB_URL=mongodb://localhost:27017/your_database_name
    CLOUD_NAME=your_cloudinary_cloud_name
    CLOUD_API_KEY=your_cloudinary_api_key
    CLOUD_API_SECRET=your_cloudinary_api_secret
    MAPBOX_TOKEN=your_mapbox_access_token
    SESSION_SECRET=your_secret_session_key
    ```

4.  **Initialize data (Optional):**

    If you have initial data you want to seed into the database, you might need to run the initialization script. Check the `init` folder for details.

5.  **Run the application:**

    ```bash
    node app.js
    ```

    The application should now be running, likely on `http://localhost:3000` (or the port configured in `app.js`).
