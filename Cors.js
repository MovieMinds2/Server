const corsOption = {
  origin: ["http://localhost:5173", "http://localhost:5174"],
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
