# Alemeno React Developer Assignment

This project is a full-stack application with separate client and server directories. Below are the instructions to get started with the project.

## Prerequisites

Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v14.x or later)
- npm (Node Package Manager)

## Getting Started

### 1. Install dependencies

You need to install the required dependencies for both the `client` and `server` folders.

# Navigate to the client folder
cd client

# Install client dependencies
npm install

# Navigate to the server folder
cd ../server

# Install server dependencies
npm install

# Inside the client folder
npm run dev

# Inside the server folder
node index.js

# Sample Data Schema
server/data/course.json


***Key Features***
This application leverages modern web development technologies and best practices. Below are the key features included in this project:

1. React + Redux Toolkit
The frontend is built using React for building dynamic user interfaces, with state management handled by Redux Toolkit. The toolkit simplifies the process of managing the application state and offers better structure to the overall project.

Redux Toolkit: Built-in support for configuring the store, slices, and dispatching asynchronous actions.
React-Redux: For efficient global state management and communication between components.
2. WebSocket for Real-Time Communication
The server and client use WebSockets to enable real-time communication, making it possible to update the UI instantly based on server-side changes or notifications without the need for refreshing the page.

3. Custom Hooks
To promote reusability, the application includes Custom React Hooks. These hooks help to encapsulate complex logic and allow for cleaner, more modular components while sharing logic across multiple components.

4. Modularization of Components
The application follows a modular approach where the UI components are split into smaller, reusable, and maintainable modules. This structure enhances code clarity, scalability, and facilitates collaboration between developers.

5. Tailwind CSS + DaisyUI
Tailwind CSS is integrated for utility-first styling, allowing for rapid custom designs and responsive layouts.
DaisyUI is used as a UI component library on top of Tailwind CSS, providing beautifully pre-styled components to improve the design workflow.

6. Responsive Design
The UI is built to be fully responsive, ensuring the application looks great on all device sizes, from mobile to desktop.

7. Deployment and Hosting
Backend (EC2): The server is hosted on an AWS EC2 instance, providing scalable and reliable infrastructure for the backend services.
Frontend (S3): The frontend is hosted on AWS S3 as a static website, which ensures high availability and automatic scaling.
