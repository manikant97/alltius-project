# Credit Card Chatbot

[![Node.js](https://img.shields.io/badge/node.js-18%2B-green)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/express-4.18%2B-blue)](https://expressjs.com/)
[![Socket.IO](https://img.shields.io/badge/socket.io-4.7%2B-orange)](https://socket.io/)

## Project Overview

This project implements a real-time conversational AI chatbot for credit card distribution using modern JavaScript technologies. The chatbot handles customer queries, personalized upselling, and CRM integration for Bank of Baroda.

## Key Features

- Real-time chat interface with WebSocket support
- Context-aware conversations using OpenAI's GPT-3.5
- Google Sheets integration for customer data management
- Automated email summaries for sales team
- Modern, responsive UI with quick action buttons
- Real-time typing indicators and message animations

## Technologies Used

- **Node.js** — Backend runtime environment
- **Express.js** — Web framework for API endpoints
- **Socket.IO** — Real-time communication
- **OpenAI API** — LLM-based conversational responses
- **Google Sheets API** — Customer data management
- **Nodemailer** — Email notifications
- **Font Awesome** — Icons and UI elements
- **Socket.IO Client** — Real-time communication
- **Git & GitHub** — Version control and repository hosting

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/<your-username>/credit_card_chatbot.git
   cd credit_card_chatbot
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
  source venv/bin/activate   # Mac/Linux
  venv\Scripts\activate      # Windows
  ```
3. **Install dependencies:**

  ```bash
  Copy
  Edit
  pip install -r requirements.txt
  ```

4. **Set up environment variables:**

Create a .env file in the project root and add your API keys and credentials:

  ```ini
  Copy
  Edit
  GOOGLE_SHEETS_CREDENTIALS=path/to/your/credentials.json
  FLAN_T5_API_KEY=your_flan_t5_api_key_here
```
5. **Run the Flask app:**

  ```bash
  Copy
  Edit
  python app.py
  ```
6. **Open your browser and go to:**
  http://192.168.1.3:8000

**Usage**

  1.Interact with the chatbot UI served at the above address.

  2.Ask FAQs or credit card-related queries.

  3.The bot maintains context and personalizes responses based on integrated data.

  4.After conversation, summaries are generated and emailed automatically.

7. **Folder Structure**
  ```pgsql
  Copy
  Edit
  credit_card_chatbot/
  ├── app.py
  ├── requirements.txt
  ├── .gitignore
  ├── templates/
  │   └── index.html
  ├── .env.example          # template for env variables (add this file)
  └── README.md
  ```
8. **Contributing**
Contributions are welcome! Feel free to open issues or submit pull requests for improvements.


1.Initial chatbot UI after user login, ready to accept queries.
<img width="1404" alt="image" src="https://github.com/user-attachments/assets/c09ad3ca-7368-4aaa-8c95-6f18dcb6c5ff" />

2.Chatbot responding to a user query with contextual and personalized answers
<img width="1155" alt="image" src="https://github.com/user-attachments/assets/ad37aea2-2807-4a5f-a915-42de698765ea" />

3.Updated Google Sheets showing user data captured and stored automatically by the chatbot.
<img width="1588" alt="image" src="https://github.com/user-attachments/assets/b0a27e07-97ea-49d8-9b62-3710cb17105c" />
