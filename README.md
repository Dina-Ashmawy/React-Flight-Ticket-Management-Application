# React Flight Ticket Management Application

This is a Flight Ticket Management application built with React, React Router DOM, React Hook Form, Yup for form validation, Redux Toolkit for state management, TypeScript, and JSON Server. The application allows users to perform CRUD operations on flight tickets, including flight code, date, and capacity.

## Setup

1. Clone the repository:
git clone https://github.com/Dina-Ashmawy/React-Flight-Ticket-Management-Application.git

## Features of The project
* Flight List Page: Display a list of flight tickets fetched from the JSON Server API.
* Flight Details Form: Implement a form using React Hook Form for adding new flight tickets with validation.
* Update Flight: Enable the ability to edit existing flight tickets with pre-filled data.
* Delete Flight: Implement a delete functionality with a confirmation prompt.
* Authentication:
  - Implement login and register with json-server-auth.
  - Guards ensure secure access to view, create, or update pages after login.

### To run frontend app follow the below steps :
1. Navigate to the frontend app directory:
cd frontend-app
2. Install node modules
npm install
3. Run the app
npm run dev
and then open local host in the browser (http://localhost:5173/)

### To run json server follow the below steps :
1. Navigate to json-server app directory:
cd json-server
2. Install node modules
npm install
3. Run the app
node server.js
and then open localhost in the browser if you want to check the backend (http://localhost:5000/)
