require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const nodemailer = require('nodemailer');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Initialize Google Sheets
const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

// Initialize Email Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('message', async (message) => {
    try {
      // Get user context from Google Sheets
      const userContext = await getUserContext(socket.id);
      
      // Generate response using OpenAI
      const response = await generateResponse(message, userContext);
      
      // Update user context with new information
      await updateUserContext(socket.id, response);
      
      // Send response to client
      socket.emit('response', response);
      
    } catch (error) {
      console.error('Error processing message:', error);
      socket.emit('error', 'Sorry, there was an error processing your request.');
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Helper functions
async function getUserContext(userId) {
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
  });
  
  const sheet = await doc.getSheetByIndex(0);
  const rows = await sheet.getRows();
  return rows.find(row => row.userId === userId) || {};
}

async function updateUserContext(userId, data) {
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
  });
  
  const sheet = await doc.getSheetByIndex(0);
  const row = await sheet.addRow({
    userId,
    ...data
  });
  return row;
}

async function generateResponse(message, context) {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a helpful credit card assistant for Bank of Baroda."
      },
      {
        role: "user",
        content: message
      },
      {
        role: "assistant",
        content: JSON.stringify(context)
      }
    ]
  });
  
  return completion.choices[0].message.content;
}

// Email sending function
async function sendSummaryEmail(summary) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.SALES_TEAM_EMAIL,
    subject: 'Credit Card Distribution Summary',
    text: summary
  };
  
  await transporter.sendMail(mailOptions);
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
