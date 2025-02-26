# [Donezo App](https://donezo-stuff.vercel.app/)

## Description

[Donezo](https://donezo-stuff.vercel.app/) is a task management application that allows users to manage tasks efficiently. It provides features like task creation, editing, deletion, and categorization into To-Do, In Progress, and Done.

This repository contains the full-stack implementation with a **React-based frontend** and **Node.js backend** using **MongoDB** for data storage.

## Technologies Used

### Backend:

- **Node.js**: JavaScript runtime for the server
- **Express**: Web framework for building the API
- **MongoDB**: NoSQL database for storing tasks
- **JWT (JSON Web Tokens)**: For authentication
- **dotenv**: For managing environment variables

### Frontend:

- **React**: JavaScript library for building user interfaces
- **Tailwind CSS**: Utility-first CSS framework for styling
- **React Query**: For data fetching and state management
- **React Router**: For routing between pages
- **React Icons**: For icons
- **Vite**: Build tool for fast development

## Features

- **User Authentication** (JWT)
- **Task Management** (CRUD: Create, Read, Update, Delete)
- **Task Categorization** (To-Do, In Progress, Done)
- **Drag-and-Drop UI** for task movement
- **Responsive Design** for mobile and desktop

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or later)
- [MongoDB](https://www.mongodb.com/try/download/community) (for local development) or MongoDB Atlas (cloud database)

## Installation

### 1. Clone the repository

Clone the repository to your local machine:

```bash
git clone https://github.com/TahsinAlahi/donezo.git
cd donezo
```

### 2. Set up the backend (Node.js)

#### Install dependencies

Navigate to the backend folder and install the required packages:

```bash
cd donezo-backend
npm install
```

#### Environment variables

Create a `.env` file in the root of the backend folder and add your environment variables:

```env
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
PORT=your_port
```

#### Run the backend

You can run the backend using either of these commands:

```bash
npm run server    # Start the backend using nodemon for auto-reload during development
npm start         # Start the backend without auto-reload
```

The backend should now be running on `http://localhost:3001` (or your specified port).

### 3. Set up the frontend (React)

#### Install dependencies

Navigate to the frontend folder and install the required packages:

```bash
cd donezo-frontend
npm install
```

#### Environment variables

Create a `.env` file in the root of the frontend folder and add your Firebase environment variables:

```env
VITE_API_KEY=your_firebase_api_key
VITE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_PROJECT_ID=your_firebase_project_id
VITE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_APP_ID=your_firebase_app_id
VITE_API_URL=http://localhost:5000   # Backend API URL
```

#### Run the frontend

Run the frontend using Vite:

```bash
npm run dev
```

The frontend will be accessible at `http://localhost:3000`.

## Usage

- **Frontend**: The frontend allows users to sign up, log in, and manage tasks.

  - **Create Tasks**: Fill in the task title, description, and due date.
  - **Edit Tasks**: Modify task details, including changing the task status.
  - **Delete Tasks**: Remove tasks from the board.
  - **Drag and Drop**: Move tasks between "To-Do," "In Progress," and "Done" columns.

- **Backend**: The backend provides a REST API with the following endpoints:
  - `POST /tasks`: Create a new task.
  - `GET /tasks`: Retrieve all tasks.
  - `PUT /tasks/:id`: Update a task by its ID.
  - `GET /tasks/:id`: Retrieve a task by its ID.
  - `DELETE /tasks/:id`: Delete a task by its ID.

## Contributing

Feel free to fork this project and submit pull requests. Ensure that your changes don't break existing functionality and add tests where possible.

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

---

## Author

[**Tahsin Alahi**](https://github.com/TahsinAlahi)
