## Installation

## Next.js and Laravel CRUD Application

This is a sample repository that demonstrates how to build a CRUD (Create, Read, Update, Delete) application using Next.js and Laravel.

Getting Started
To get started with this project, you'll need to have the following installed on your system:

-   **Node.js**
-   **PHP**
-   **Composer**

You'll also need to have a local MySQL server running, as this project uses MySQL as its database.

Once you have these dependencies installed, you can follow these steps to get the project up and running:

Clone this repository to your local machine:

git clone https://github.com/obaidahmadzai/nextjs_laravel_crud.git

Navigate to the project directory:

**cd nextjs_laravel_crud**

Install the Laravel dependencies:

**composer install**

Create a new database for the project in MySQL.

database name: **app**

copy the .env.example file to .env

**cp .env.example .env**

Generate a new application key:

**php artisan key:generate**

Run the database migrations to create the necessary tables:

**php artisan migrate**

Start the Laravel server:

**php artisan serve**

In a new terminal window

Navigate to the project directory:

the **client** directory is inside the "nextjs_laravel_crud"

**cd client**

Install the Nextjs dependencies:

**npm install**

copy the .env.example file to .env.local and supply the URL of your backend:

**cp .env.example .env.local**

Finally, run the application via npm run dev. The application will be available at **http://localhost:3000:**

**npm run dev**
