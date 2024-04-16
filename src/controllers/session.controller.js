import { Session } from "../models/session.model.js";

import { asyncHandler } from "../utils/asyncHandler.js";

// Add a new session
const createSession = asyncHandler(async (req, res) => {
    try {
        const { username, date, time, roomcode, trainername } = req.body;
        console.log(username, date, time, roomcode, trainername )
        // Create a new session
        const session = new Session({ username, date, time, roomcode, trainername });
        await session.save();

        res.status(201).json({
            message: "Session created successfully",
            session: session,
            status: 201,
        });
    } catch (error) {
        console.error("Error creating session:", error);
        res.status(500).json({ message: "Internal server error", status: 500 });
    }
});

// Get all sessions
const getAllSessions = asyncHandler(async (req, res) => {
    try {
        const sessions = await Session.find();
        res.status(200).json({
            message: "Sessions retrieved successfully",
            sessions: sessions,
            status: 200,
        });
    } catch (error) {
        console.error("Error retrieving sessions:", error);
        res.status(500).json({ message: "Internal server error", status: 500 });
    }
});

// Get session by ID
const getSessionById = asyncHandler(async (req, res) => {
    try {
        const sessionId = req.params.id;
        const session = await Session.findById(sessionId);
        if (!session) {
            return res.status(404).json({ message: "Session not found", status: 404 });
        }
        res.status(200).json({
            message: "Session retrieved successfully",
            session: session,
            status: 200,
        });
    } catch (error) {
        console.error("Error retrieving session:", error);
        res.status(500).json({ message: "Internal server error", status: 500 });
    }
});

// Update session by ID
const updateSessionById = asyncHandler(async (req, res) => {
    try {
        const sessionId = req.params.id;
        const updates = req.body;
        const options = { new: true }; // Return the modified document rather than the original
        const updatedSession = await Session.findByIdAndUpdate(sessionId, updates, options);
        if (!updatedSession) {
            return res.status(404).json({ message: "Session not found", status: 404 });
        }
        res.status(200).json({
            message: "Session updated successfully",
            session: updatedSession,
            status: 200,
        });
    } catch (error) {
        console.error("Error updating session:", error);
        res.status(500).json({ message: "Internal server error", status: 500 });
    }
});

// Delete session by ID
const deleteSessionById = asyncHandler(async (req, res) => {
    try {
        const sessionId = req.params.id;
        const deletedSession = await Session.findByIdAndDelete(sessionId);
        if (!deletedSession) {
            return res.status(404).json({ message: "Session not found", status: 404 });
        }
        res.status(200).json({
            message: "Session deleted successfully",
            status: 200,
        });
    } catch (error) {
        console.error("Error deleting session:", error);
        res.status(500).json({ message: "Internal server error", status: 500 });
    }
});

// Get sessions by username
const getSessionsByUsername = asyncHandler(async (req, res) => {
    try {
        const { username } = req.params;
        const sessions = await Session.find({ username });
        if (sessions.length === 0) {
            return res.status(404).json({ message: "No sessions found for the specified username", status: 404 });
        }
        res.status(200).json({
            message: "Sessions retrieved successfully",
            sessions: sessions,
            status: 200,
        });
    } catch (error) {
        console.error("Error retrieving sessions by username:", error);
        res.status(500).json({ message: "Internal server error", status: 500 });
    }
});
export { createSession, getAllSessions, getSessionById, updateSessionById, deleteSessionById ,getSessionsByUsername };
