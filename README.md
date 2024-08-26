
# HomeLand

HomeLand is a full-stack application for a housing rental website, inspired by Airbnb. This project was conceived during my undergraduate studies, when I realized that no company in Iran was operating in this field. I chose this project as my thesis to contribute to the advancement of the software industry in Iran. HomeLand is also my first full-stack development project, and it reflects my commitment to building innovative software solutions.

## Table of Contents

- [Technologies](#technologies)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Technologies

### Frontend

- **React**: JavaScript library for building user interfaces
- **React Router**: Routing library for React
- **React Bootstrap**: Bootstrap components built with React
- **Redux**: State management
- **Axios**: HTTP client for making requests
- **React PayPal Button**: PayPal integration for payments

### Backend

- **Django**: Python web framework for building the backend
- **Django REST Framework**: Toolkit for building Web APIs
- **SQLite**: Default database used for development

## Features

### User Features

- Browse available housing listings
- View details of each listing
- Add listings to the cart
- Register and login
- Manage user profiles
- Checkout and place orders
- Pay for orders via PayPal

### Admin Features

- Manage users (list, edit, delete)
- Manage products (list, edit, delete)
- Manage orders (list, edit, delete)
- View order details and update order statuses

## Installation

### Prerequisites

- Python 3.8+
- Node.js 14+
- npm or yarn

### Clone the repository

```bash
git clone https://github.com/yourusername/homeland.git
cd homeland
```

### Backend Setup

1. **Create a virtual environment and activate it**:

```bash
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scriptsctivate`
```

2. **Install backend dependencies**:

```bash
pip install -r requirements.txt
```

3. **Run database migrations**:

```bash
python manage.py migrate
```

4. **Create a superuser for accessing the admin interface**:

```bash
python manage.py createsuperuser
```

5. **Run the backend server**:

```bash
python manage.py runserver
```

### Frontend Setup

1. **Navigate to the frontend directory**:

```bash
cd frontend
```

2. **Install frontend dependencies**:

```bash
npm install
```

3. **Start the frontend server**:

```bash
npm start
```

The application will be accessible at `http://localhost:3000`.

## Usage

### Running the Application

1. Start the backend server with:

```bash
python manage.py runserver
```

2. Start the frontend server with:

```bash
npm start
```

### Access the Admin Interface

Visit `http://localhost:8000/admin` and log in using the superuser credentials you created.

## API Endpoints

### User Authentication

- **POST** `/api/users/login/`: Login user
- **POST** `/api/users/register/`: Register user
- **GET** `/api/users/profile/`: Get user profile
- **PUT** `/api/users/profile/update/`: Update user profile

### Product Management

- **GET** `/api/products/`: Get all products
- **GET** `/api/products/:id/`: Get product by ID
- **POST** `/api/products/`: Create new product (admin only)
- **PUT** `/api/products/:id/`: Update product (admin only)
- **DELETE** `/api/products/:id/`: Delete product (admin only)

### Order Management

- **GET** `/api/orders/`: Get all orders (admin only)
- **GET** `/api/orders/:id/`: Get order by ID
- **POST** `/api/orders/`: Create a new order
- **PUT** `/api/orders/:id/pay/`: Update order to paid
- **PUT** `/api/orders/:id/deliver/`: Update order to delivered

## Contributing

Feel free to submit issues, create pull requests, or suggest improvements. 

## Contact

For any questions or support, please contact mahdimoghassemi@gmail.com.
