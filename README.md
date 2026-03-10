Ecocycle Frontend — local testing notes

How to connect the frontend to the backend during development:

- Start the backend server (from GROUP E/ECOCYCLE-signin-auth):
  - Install deps: npm install
  - Create a .env with MONGO_URI and JWT_SECRET
  - Run: npm run dev (or node server.js). The backend listens on port 4000 by default in this project.

- By default the frontend's API helper will target port 4000 on the same host. To override the API base when testing from the filesystem or a different host, set a global variable before loading scripts. Example (in the browser console or a small inline script in index.html):
  <script>
    // point frontend to local backend on port 4000
    window.ECO_API_BASE = 'http://localhost:4000/api';
  </script>

- Open the frontend pages in your browser (e.g., ecocycle/sign-in/index.html) and try Sign Up / Sign In.

Notes:
- After successful signin/signup the JWT is stored in localStorage under the key `ecocycle_token` and the user under `ecocycle_user`.
- The frontend uses a small fetch wrapper at `shared/api.js` which attaches the Authorization header when a token is present.
# EcoCycle - Redefining Nigeria's Waste Management Experience

EcoCycle is a digital platform designed to address the waste management challenges faced by households in Nigeria. It bridges the gap between households and waste pickup providers by providing a mobile/web solution that allows users to request pickups on-demand or via schedule, while enabling waste management companies to optimize routes and track service delivery.

## Overview

Currently, households in Nigeria struggle to efficiently dispose of waste due to a lack of visibility, communication, and technology-enabled waste collection services. This often results in unsafe practices such as burning waste, which negatively impacts both community health and the environment.

EcoCycle aims to solve these problems by providing:
- Real-time scheduling and notifications for waste pick-ups
- Easy reporting tools for missed services
- Incentives for household level recycling
- Feedback mechanisms for informed decision making by stakeholders

## Features

### Core Features (MVP)
- **Sign-up & Login**: User authentication and account management
- **Homepage**: Central navigation hub
- **User Profile**: Setup as household or driver
- **View Subscriptions**: Self-service hub for recycling plans
- **Schedule Pickup**: Request waste collection
- **Report Missed Pickup**: Report issues with collection
- **Payment & Invoices**: Financial management
- **Driver Job Queue**: Organized list of pickups
- **Accept/Reject Requests**: Driver control over pickups
- **Navigation & Integration**: Real-time directions for drivers
- **Real-time Tracking**: Monitor collection activities
- **Contact Support**: Customer service access
- **Settings**: User preferences and controls
- **Admin Portal**: Waste inventory tracking and compliance management

### Future Enhancements
- AI-driven smart route optimization
- Recycling marketplace integration
- Rewards/wallet for eco-friendly households
- Government policy and compliance modules

## Technology Stack

### Backend
- **Server**: Node.js with Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Real-time Communication**: Socket.io
- **Payment Gateway**: Paystack
- **Maps & Navigation**: Google Maps API

### Frontend
- **Web Application**: React.js with Material UI
- **Mobile Application**: React Native
- **Admin Dashboard**: React.js with Material UI

### DevOps
- **Version Control**: Git
- **CI/CD**: GitHub Actions
- **Hosting**: AWS EC2
- **Containerization**: Docker

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/uniquesamjohn/ecocycle.git
cd ecocycle
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the backend server
```bash
npm run dev
```

5. Install frontend dependencies
```bash
cd ../frontend/web
npm install
```

6. Start the frontend development server
```bash
npm start
```

## API Documentation

The API documentation is available at `/api-docs` when the server is running.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- EcoCycle Team
- TechyJaunt
- All contributors and supporters