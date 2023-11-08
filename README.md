# Backend Blanja Website Team Project

Backend repository of Blanja E-commerce

## Table of Contents

- [Description](#Description)
- [Project Structure](#Project)
- [Built With](#Built-With)
- [Database Schema](#Database-Schema)
- [Usage](#Usage)
- [Screenshots](#Screenshots)
- [Related Project](#Related-Project)
- [Contributing](#Contributing)

## Description

Blanja E-commerce Backend is the engine that powers our user-friendly platform, enabling seamless buying and selling experiences. It provides essential functionalities for sellers to list products, manage inventory, and engage with customers. Buyers can effortlessly browse products and make secure transactions, ensuring a smooth and enjoyable e-commerce journey.

## Project Structure

```
|── Backend
   |── public                  # Public assets (images, etc.)
   |── src                     # Project source code
       |── config              # Configuration files
       |   ├── cloudinaryConfig.js  # Cloudinary configuration settings
       |   ├── db.js            # Database configuration settings
       |   └── redisConfig.js   # Redis configuration settings
       |
       |── controller          # Request handlers and route controllers
       |   ├── addressController.js   # Address-related logic
       |   ├── categoryController.js  # Category-related logic
       |   ├── customerController.js  # Customer-related logic
       |   ├── orderController.js     # Order-related logic
       |   ├── productController.js   # Product-related logic
       |   └── sellerController.js    # Seller-related logic
       |
       |── helper              # Helper functions and utilities
       |   ├── jwt.js          # JSON Web Token utility functions
       |   └── ...             # Other utility files
       |
       |── middleware          # Custom middleware functions
       |   ├── auth.js         # Authentication middleware
       |   ├── findUser.js     # Middleware to find user by ID
       |   ├── redis.js        # Redis middleware for caching
       |   ├── upload.js       # General file upload middleware
       |   ├── uploadProduct.js # File upload middleware specific to products
       |   └── verifyRole.js   # Middleware to verify user roles
       |
       |── model               # Database models and schema definitions
       |   ├── addressModel.js   # Address model schema
       |   ├── categoryModel.js  # Category model schema
       |   ├── customerModel.js  # Customer model schema
       |   ├── orderModel.js     # Order model schema
       |   ├── productModel.js   # Product model schema
       |   └── sellerModel.js    # Seller model schema
       |
       |── router              # Route definitions and API endpoints
       |   ├── addressRouter.js   # Address-related routes
       |   ├── categoryRouter.js  # Category-related routes
       |   ├── customerRouter.js  # Customer-related routes
       |   ├── mainRouter.js      # Main application routes
       |   ├── orderRouter.js     # Order-related routes
       |   ├── productRouter.js   # Product-related routes
       |   └── sellerRouter.js    # Seller-related routes
   |
   |── .gitignore              # List of files to be ignored by Git
   |── README.md               # Project documentation for GitHub

```

## Built With

Technologies Utilized:

- Node.js: A scalable and event-driven JavaScript runtime for building high-performance applications.
- Express.js: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. It simplifies the process of building efficient and scalable web APIs and applications.
- PostgreSQL: A powerful open-source relational database system ensuring structured data storage and retrieval.
- Cloudinary: A cloud-based media management solution enabling seamless storage and optimization of images and videos.
- JSON Web Tokens (JWT): A secure method for authenticating and verifying the identity of users, ensuring data integrity.
- Multer: Middleware for handling file uploads, essential for managing product images efficiently.

## Database Schema

[Click here for Database Schema](/query.sql)

## Usage

To use this project, follow these steps:

1. **Clone This Repository**

   ```bash
   git clone https://github.com/xTats/BE-Blanja-Team-Project.git
   cd BE-Blanja-Team-Project
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Database**

   - Create a PostgreSQL database and note down the database name, username, password, and host.

4. **Run the Server**

   ```bash
   npm start
   ```

5. **API Endpoint**
  
  API Enpoint are available in our postman documentation
   
   [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/29238474-b4c6395f-1116-4638-932a-90414dfce5d8?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D29238474-b4c6395f-1116-4638-932a-90414dfce5d8%26entityType%3Dcollection%26workspaceId%3Df8472dc0-395a-4836-8dea-9ca7e845a285)

## Related Project

Frontend repository of Blanja E-commerce, clone this for the complete set of features.
[FE-Blanja-TeamProject](https://github.com/xTats/FE-Blanja-TeamProject)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.