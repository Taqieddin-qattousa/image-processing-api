# Image Processing API

## Project Overview

This project is a robust and scalable image processing API built with **Node.js**, **Express**, and **TypeScript**. It serves two primary purposes:

- **Dynamic Image Resizing:** Resize images from a source directory to specified dimensions on-the-fly.
- **Efficient Caching:** Caches resized images (thumbnails) for instant delivery on subsequent requests, reducing server load and improving performance.

Built from scratch with a focus on modern development practices, including unit testing, linting, and formatting for high-quality, maintainable code.

---

## Features

- **On-the-Fly Resizing:** Images resized via simple URL query parameters.
- **Caching System:** Resized images saved to disk for fast delivery.
- **Scalable Architecture:** Organized into routes and utilities for easy expansion.
- **TypeScript Support:** Full type safety and improved developer experience.
- **Code Quality:** ESLint (linting) and Prettier (formatting) configurations.
- **Automated Testing:** Unit and endpoint tests using Jasmine and Supertest.

---

## Project Structure

The project is organized with a clear and scalable structure to separate concerns:

```
image-processing-api/
├── assets/
│   ├── full/       # Original, full-size images are placed here
│   └── thumbs/     # Resized thumbnails are automatically cached here
├── spec/           # Contains all test files (Jasmine)
├── src/            # Source code for the application
│   ├── routes/     # API route definitions
│   └── utilities/  # Core logic, like the image processor
├── .env            # Local environment variables (ignored by Git)
├── .env.example    # Example environment file
├── eslint.config.js # ESLint configuration
├── package.json    # Project dependencies and scripts
└── tsconfig.json   # TypeScript compiler configuration
```

---

## Getting Started

Follow these instructions to set up the project locally for development and testing.

### Prerequisites

- **Node.js** (v18 or higher)
- **npm**

### Installation

Clone the repository:

```bash
git clone https://github.com/Your-Username/image-processing-api.git
cd image-processing-api
```

Install dependencies:

```bash
npm install
```

Set up environment variables:

```bash
cp .env.example .env
```

You can modify the `PORT` in the `.env` file if needed.

**Add source images:**  
Place your `.jpg` images inside the `/assets/full` directory. Example images: `fjord.jpg`, `santamonica.jpg`.

---

## Available Scripts

| Script           | Description                                         |
| ---------------- | --------------------------------------------------- |
| `npm run dev`    | Starts the server in development mode (nodemon).    |
| `npm run start`  | Builds and starts the production server.            |
| `npm run build`  | Compiles TypeScript to JavaScript in `/dist`.       |
| `npm test`       | Runs all unit and endpoint tests (Jasmine).         |
| `npm run lint`   | Lints TypeScript files for errors and style issues. |
| `npm run format` | Formats all files using Prettier.                   |

---

## API Endpoint Documentation

### GET `/api/images`

Processes and serves a resized version of an image.

#### Query Parameters

| Parameter | Type   | Required | Description                                  |
| --------- | ------ | -------- | -------------------------------------------- |
| filename  | string | Yes      | Name of the source image file (no extension) |
| width     | number | Yes      | Desired width in pixels                      |
| height    | number | Yes      | Desired height in pixels                     |

#### Example Request

Resize `fjord.jpg` to 300x300 pixels:

```
http://localhost:3000/api/images?filename=fjord&width=300&height=300
```

#### Server Responses

- **200 OK:** Resized image returned.
- **400 Bad Request:** Missing/invalid query parameters.
- **404 Not Found:** Source image not found in `/assets/full`.
- **500 Internal Server Error:** Unexpected server error.

---

## Technologies Used

- **Backend:** Node.js, Express.js
- **Language:** TypeScript
- **Image Processing:** Sharp
- **Testing:** Jasmine, Supertest
- **Code Quality:** ESLint, Prettier
