# Dashboard Project

A simple dashboard application with a React frontend and a minimal backend server.

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   ```
2. Set up the server

```bash
cd server
npm install
npm run migrate
npm run seed
npm start
```
3. Set up the client
Open a new terminal tab and run:

```bash
cd client
npm install
```

4. Create the environment file
In the client folder, create a file named .env and add the following line:
VITE_SERVER_DOMAIN=http://localhost:3000/api

3. Start the client
```bash
npm run dev
```
Your dashboard should now be running locally.

