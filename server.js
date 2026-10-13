const express = require("express");
const connectDB = require("./config/db");
const app = express();

//11. Router
const bookRoutes = require("./routes/bookRoutes");
const loanRoutes = require("./routes/loanRoutes");
const memberRoutes = require("./routes/memberRoutes");

//12. Middleware
app.use(express.json());
//13. API Routes
app.use("/api/books", bookRoutes); 
app.use("/api/loans", loanRoutes); 
app.use("/api/members", memberRoutes);

//connect to database
connectDB();

app.get("/", async (req, res) => {
    try {
        res.send({ message: "Welcome to Practical Exam!" });
    } catch (error) {
        res.send({ error: error.message });
    }

});

const PORT = process.env.PORT || 9999;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));