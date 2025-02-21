# Full Stack Realtime Chat Application

A modern real-time chat application built with React, Node.js, and Socket.IO, featuring a clean UI with DaisyUI and Tailwind CSS.

![image](https://github.com/user-attachments/assets/d870784d-9509-4dd7-8447-9a460f82fcfb)




## Features

- User authentication with JWT
- Real-time messaging with Socket.IO
- Image sharing capabilities
- Multiple theme options
- User online/offline status
- Responsive design
- Image enlargement view
- Online users filter

## Tech Stack

- **Frontend:**

  - React
  - TailwindCSS
  - DaisyUI
  - Socket.IO Client
  - Zustand (State Management)
  - React Router DOM

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - Socket.IO
  - JWT Authentication
  - Cloudinary (Image Storage)

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- Cloudinary Account

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/fullstack-chat-app.git
cd fullstack-chat-app
```

2. Install dependencies for both frontend and backend

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
```

3. Create `.env` file in the root directory

```env
MONGODB_URI=your_mongodb_uri
PORT=5001
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

NODE_ENV=development
```

4. Start the development server

```bash
# Start backend (from root directory)
npm run dev

# Start frontend (from frontend directory)
npm run dev
```

## Building for Production

```bash
# Build frontend
cd frontend
npm run build

# Start production server (from root directory)
npm start
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact
