# Real-Time Chat Application - Deeply

A full-stack **real-time chat application** designed to demonstrate modern web development practices, secure authentication, scalable backend architecture, and **real-time communication using WebSocket API and Socket.IO**. This project showcases the ability to implement low-latency messaging systems essential for modern interactive web applications.

---

## Key Features

### Real-Time Messaging
- Implements **WebSocket API** and **Socket.IO** to enable bidirectional, low-latency communication.
- Users receive instant updates when messages are sent, without needing to refresh the page.
- Supports multiple chat rooms and direct messaging between users.
- Tracks user online/offline status in real-time to enhance interactivity.

### Authentication & Authorization
- **Firebase Authentication** is used to secure user accounts.
- Email/password registration and login.
- **Google Sign-In** integration for easy social login.
- Proper session management ensures secure access to chat features.

### User Interface
- Built with **React** and **TypeScript** for robust, type-safe frontend development.
- **TailwindCSS** and **Material-UI** for responsive and modern UI design.
- Clean, mobile-friendly layout for seamless experience across devices.
- Real-time notifications for new messages enhance usability.

### Backend Architecture
- **Express.js** server with organized structure: controllers, routers, and models.
- **WebSocket API & Socket.IO** integration for real-time message delivery.
- Scalable architecture allows easy addition of new features, such as group chats or multimedia support.
- Handles events like `user-connected`, `user-disconnected`, and `new-message` efficiently.

### Database
- **MongoDB** is used to store users, chat rooms, and messages.
- Allows persistence of chat history for future retrieval.
- Efficient schema design ensures fast querying and real-time syncing with frontend.
- Works seamlessly with WebSocket server to store and broadcast messages in real-time.

---

## Tech Stack

### Frontend
- React & TypeScript
- TailwindCSS
- Material-UI
- Firebase Authentication

### Backend
- Node.js & Express.js
- WebSocket API & Socket.IO
- RESTful API structure (Controllers, Routers, Models)
- MongoDB for data persistence

---

## Installation & Setup


1. Clone the repository:
   ```bash
   git clone https://github.com/gahramanova/Deeply_Real_Chat_App
