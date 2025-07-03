const corsOption = {
  origin: [
    "https://localhost:5173",
    "https://localhost:5174",
    "https://localhost:5175",
    "https://localhost:5176",
    `https://moviereview-5acd9.web.app`,
  ],
  methods: ["GET", "POST"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Postman-token",
    "Content-Length",
    "Host",
    "User-Agent",
    "Accept",
  ],
  exposedHeaders: ["Content-Length", "Authorization"],
  credentials: true, 
  maxAge: 3600,
};

module.exports = corsOption;
