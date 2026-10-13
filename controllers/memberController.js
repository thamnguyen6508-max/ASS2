const Member = require("../models/Member");

// GET all members
exports.getAllMembers = async (req, res) => {
    try {
        const members = await Member.find();
        res.status(200).json(members);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET member by id
exports.getMemberById = async (req, res) => {
    try {
        const member = await Member.findById(req.params.id);
        if (!member) {
            return res.status(404).json({ message: "Member not found" });
        }
        res.status(200).json(member);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST create a member
exports.createMember = async (req, res) => {
    try {
        const newMember = new Member(req.body);
        await newMember.save();
        res.status(201).json(newMember);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// PUT update a member
exports.updateMember = async (req, res) => {
    try {
        const member = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!member) {
            return res.status(404).json({ message: "Member not found" });
        }
        res.status(200).json(member);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE a member
exports.deleteMember = async (req, res) => {
    try {
        const member = await Member.findByIdAndDelete(req.params.id);
        if (!member) {
            return res.status(404).json({ message: "Member not found" });
        }
        res.status(200).json(member);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};