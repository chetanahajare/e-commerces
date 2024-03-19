"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const usermodel_1 = __importDefault(require("../model/usermodel"));
function registerUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, email, password } = req.body;
        try {
            const existingUser = yield usermodel_1.default.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ error: 'User already exists' });
            }
            const newUser = new usermodel_1.default({ username, email, password });
            yield newUser.save();
            res.status(201).json({ message: 'User registered successfully' });
        }
        catch (error) {
            console.error('Error registering user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
}
function loginUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            const user = yield usermodel_1.default.findOne({ email });
            if (!user) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }
            const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }
            res.status(200).json({ message: 'Login successful', user });
        }
        catch (error) {
            console.error('Error logging in user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
}
const userController = {
    registerUser,
    loginUser,
};
exports.default = userController;
