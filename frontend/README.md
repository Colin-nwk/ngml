# ngml_frontend_v2

**Version:** 0.0.0

## Description

Describe your project here. Include its purpose, features, and any other relevant information.

This project is a private web solution to automate the processes, workflow, customer relationship,bidding process for NNPC subsidiary (NGML)

## Table of Contents

- [ngml_frontend_v2](#ngml_frontend_v2)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Docker](#docker)
    - [Build and Run with Docker Compose](#build-and-run-with-docker-compose)
  - [Scripts](#scripts)
  - [Dependencies](#dependencies)
  - [Dev Dependencies](#dev-dependencies)
  - [Contributing](#contributing)
  - [License](#license)

## Installation

Ensure you have [Node.js](https://nodejs.org/) installed before proceeding.

1. Clone the repository:

   ```bash
   git clone https://github.com/Skillz-systems/ngml_frontend_v2.git
   ```

2. Navigate to the project directory:

   ```bash
   cd ngml_frontend_v2
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Usage

Describe how to use your project. Include any important steps or configurations.

## Docker

### Build and Run with Docker Compose

1. Ensure you have [Docker](https://www.docker.com/get-started) and [Docker Compose](https://docs.docker.com/compose/install/) installed.

2. Run the following command to build and start the services defined in the `docker-compose.yml` file:

   ```bash
   docker-compose up
   ```

   If you want to run it in detached mode (in the background), you can use the `-d` flag:

   ```bash
   docker-compose up -d
   ```

3. To stop and remove the containers created by your services, run:

   ```bash
   docker-compose down
   ```

## Scripts

- **dev:** Start the development server.

  ```bash
  npm run dev
  ```

- **build:** Build the project.

  ```bash
  npm run build
  ```

- **lint:** Run ESLint for linting.

  ```bash
  npm run lint
  ```

- **preview:** Preview the project.

  ```bash
  npm run preview
  ```

- **test:** Run tests using Vitest.

  ```bash
  npm test
  ```

- **storybook:** Start the Storybook server.

  ```bash
  npm run storybook

  ```

- **storybook:build:** Build the Storybook documentation.

  ```bash
  npm run build-storybook

  ```

## Dependencies

- **@emotion/react:** ^11.11.3
- **@emotion/styled:** ^11.11.0
- **@mui/icons-material:** ^5.15.4
- **@mui/material:** ^5.15.4
- **react:** ^18.2.0
- **react-dom:** ^18.2.0
- **react-router-dom:** ^6.21.2

## Dev Dependencies

- **@testing-library/jest-dom:** ^6.2.0
- **@testing-library/react:** ^14.1.2
- **@types/react:** ^18.2.43
- **@types/react-dom:** ^18.2.17
- **@typescript-eslint/eslint-plugin:** ^6.14.0
- **@typescript-eslint/parser:** ^6.14.0
- **@vitejs/plugin-react:** ^4.2.1
- **autoprefixer:** ^10.4.16
- **eslint:** ^8.55.0
- **eslint-plugin-react-hooks:** ^4.6.0
- **eslint-plugin-react-refresh:** ^0.4.5
- **jsdom:** ^23.2.0
- **postcss:** ^8.4.33
- **storybook:** ^7.6.8
- **tailwindcss:** ^3.4.1
- **typescript:** ^5.2.2
- **vite:** ^5.0.8
- **vitest:** ^1.1.3

## Contributing

If you want to contribute to this project, follow these steps:

1. Clone the project.
2. Create a new branch for the task.
3. Make your changes and commit them.
4. Push to your task and submit a pull request.

## License

This project is licensed under the [License Name] - see the [LICENSE.md](LICENSE.md) file for details.
