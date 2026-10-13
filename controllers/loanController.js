const Loan = require("../models/Loan");

// GET all loans
exports.getAllLoans = async (req, res) => {
    try {
        const loans = await Loan.find()
            // Lấy thông tin Member, chỉ chọn fullName, email và phone
            .populate("member_id", "fullName email phone") 
            // Lấy thông tin Book, chỉ chọn title, author và isbn
            .populate("items.book_id", "title author isbn"); 
            
        res.status(200).json(loans);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET loan by id
exports.getLoanById = async (req, res) => {
    try {
        const loan = await Loan.findById(req.params.id)
            // Tương tự, dùng select option để giới hạn trường trả về
            .populate("member_id", "fullName email phone")
            .populate("items.book_id", "title author isbn");
            
        if (!loan) {
            return res.status(404).json({ message: "Loan not found" });
        }
        res.status(200).json(loan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST create a loan
exports.createLoan = async (req, res) => {
    try {
        const newLoan = new Loan(req.body);
        await newLoan.save();
        res.status(201).json(newLoan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// PUT update a loan
exports.updateLoan = async (req, res) => {
    try {
        const loan = await Loan.findByIdAndUpdate(req.params.id, req.body, { 
            new: true, 
            runValidators: true 
        });
        
        if (!loan) {
            return res.status(404).json({ message: "Loan not found" });
        }
        res.status(200).json(loan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE a loan
exports.deleteLoan = async (req, res) => {
    try {
        const loan = await Loan.findByIdAndDelete(req.params.id);
        
        if (!loan) {
            return res.status(404).json({ message: "Loan not found" });
        }
        res.status(200).json({ message: "Loan deleted successfully", data: loan });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};