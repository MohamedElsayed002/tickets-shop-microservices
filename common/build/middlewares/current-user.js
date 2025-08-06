"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const currentUser = (req, res, next) => {
    var _a;
    // If no JWT exists in session, continue without setting currentUser
    if (!((_a = req.session) === null || _a === void 0 ? void 0 : _a.jwt)) {
        return next();
    }
    try {
        // Make sure JWT_KEY is defined in the environment
        if (!process.env.JWT_KEY) {
            throw new Error('JWT_KEY must be defined in environment variables');
        }
        const payload = jsonwebtoken_1.default.verify(req.session.jwt, process.env.JWT_KEY);
        req.currentUser = payload;
    }
    catch (err) {
        console.error('JWT verification failed:', err);
    }
    next();
};
exports.currentUser = currentUser;
