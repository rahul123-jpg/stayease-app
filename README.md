🏨 StayEase – Hotel Booking Web App

StayEase is a full-stack hotel and property booking platform inspired by Airbnb. It allows users to explore hotels, view details, book stays, and leave reviews — all with secure authentication and authorization.


---

🚀 Tech Stack

Frontend:

EJS (Embedded JavaScript Templates)

Bootstrap 5

CSS3 & JavaScript


Backend:

Node.js

Express.js

MongoDB (with Mongoose)


Authentication & Authorization:

Passport.js

Express-Session

Secure Password Hashing (bcrypt)



---

📋 Features

✅ User Authentication (Sign Up / Login / Logout)
✅ Role-based Authorization (Only owners can edit/delete their listings)
✅ Add, Edit, and Delete Hotel Listings
✅ Review System (Users can add, edit, and delete reviews)
✅ Responsive UI using Bootstrap
✅ Image Uploads for Hotels (via Cloud or Local Storage)
✅ Secure Routes and Form Validations
✅ RESTful APIs for CRUD Operations


---

🗂️ Models Used

User Model: Handles user details, authentication, and roles.

Listing Model: Stores hotel details like title, price, location, and images.

Review Model: Stores user reviews and ratings for listings.



---⚙️ Installation & Setup

To run this project locally:

# Clone the repository
git clone https://github.com/YourUsername/StayEase.git

# Go to the project directory
cd StayEase

# Install dependencies
npm install

# Setup environment variables
# Create a .env file and add the following:
# MONGO_URL=your_mongodb_connection_string
# SESSION_SECRET=your_secret_key
# CLOUDINARY_CLOUD_NAME=your_cloud_name
# CLOUDINARY_API_KEY=your_api_key
# CLOUDINARY_API_SECRET=your_api_secret

# Run the app
npm start

Open your browser and go to http://localhost:3000
