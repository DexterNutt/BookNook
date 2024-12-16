# BookNook

**BookNook** is a web application designed to help users search, sort, and explore books. It is hosted on Vercel, leveraging serverless functions for backend functionality and React for the frontend.
While coding this little app I learned host serverless applications with Vercel, and implement better search functionality in my projects with the debounce custom hook.

### Live Demo

Visit the live version of the app at: [library-booknook.vercel.app](https://library-booknook.vercel.app/)

---

## Features

- Search for books by title, author, or genre.
- Sort books by different categories.
- Unsure what to search for? Just hit the spacebar.
---

## Getting Started Locally

Follow the instructions below to set up the project and run it locally on your machine.

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v16 or later)
- **npm** (Node Package Manager)
- **Vercel CLI** (for local development)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/DexterNutt/BookNook.git
   cd BookNook
   ```

2. **Install dependencies**:

   ```bash
   npm run instal-all
   ```
   

### Running the App Locally

In the root directory use the following script to start the application:

```bash
npm start
```

This command runs:

- `vercel dev`: To simulate the Vercel hosting environment locally.
- `npm run frontend`: Which initiates the front-end development server.



---

## Technologies Used

- **React**: Front-end library for building the UI.
- **Vercel**: Hosting and deployment with serverless functions.

