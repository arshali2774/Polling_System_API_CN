# Polling System API

This is an API-based polling system implemented using Node.js, Express, MongoDB, and Socket.IO.

## Features

- Create questions with options
- Add votes to options
- Real-time updates using Socket.IO
- Scalable folder structure
- Error handling

## Folder Structure

```
project-root/
│
├── src/
│   ├── config/
│   │   └── db.config.js
│   │
│   ├── controllers/
│   │   ├── option controller/
│   │   │    └── option.controller.js
│   │   │
│   │   └── question controller/
│   │        └── question.controller.js
│   │
│   ├── models/
│   │   ├── option model/
│   │   │    ├── option.model.js
│   │   │    └── option.schema.js
│   │   │
│   │   └── question model/
│   │        ├── question.model.js
│   │        └── question.schema.js
│   │
│   └── routes/
│       ├── options.routes.js
│       └── questions.routes.js
│
├── app.js
├── package.json
└── README.md
```

## Setup Instructions

1. Clone the repository to your local machine:

```bash
git clone https://github.com/arshali2774/Polling_System_API_CN
```

2. Navigate to the project directory:

```bash
cd Polling_System_API_CN
```

3. Install dependencies:

```bash
npm i && npm i -D
```

5. Start the server:

```bash
npm run dev
```

## Usage

Use Postman or any API testing tool to interact with the endpoints.
Socket.IO is integrated for real-time updates. Clients will receive updates when questions, options, or votes are created.

## API Endpoints

### Questions

- **POST /questions/create:** Create a new question
- **POST /questions/:id/options/create:** Add options to a specific question
- **GET /questions/:id:** View a question and its options
- **DELETE /questions/:id/delete:** Delete a question

### Options

- **POST /options/:id/add_vote:** Add a vote to an option
- **DELETE /options/:id/delete:** Delete an option

## Credits

This project was created by Arsh Ali. Special thanks to Coding Ninjas.

## License

This project is licensed under the MIT License.
