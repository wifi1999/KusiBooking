# KusiBooking App

## Overview 

KusiBooking is a full-stack Hotel Booking App offering seamless hotel reservation process. Users can browse and select hotels/rooms based on guest counts, move-in dates, and location preferences. The App incorperate search filters for location, price, and rating to refine results. 

## Project Structure 

### Backend 
The backend is powered by Node.js and Express.js for efficient routing. MongoDB serves as the database, managed efficiently with Moogoose. It facilitate user authentication, hotel/room selection, filtering, and reservation handling. Additionally, JsonWebToken API is intergrated for building a secure authentication and authorization system 

### Frontend 
The frontend is powered by React.js to deliver responsive pages. The Context API is utilized for persistent user and reservation states across multiple pages.

## Features 

### User Authentication 
- Secure user registration, login, and logout.
- State management via Context API and JsonWebToken for authentication and authorization.

### Hotel Filtering
- Filter hotels based on move-in dates, price, and location preferences.

### Automated Price Calculation
- Automatically calculate prices based on guest counts and stay duration for each reservation.

### Availability Handling
- Filter out reserved hotels for a reliable reservation process.
