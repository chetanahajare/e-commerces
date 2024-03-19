"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usercontroller_1 = __importDefault(require("../controllers/usercontroller"));
const router = express_1.default.Router();
router.post('/superAdmin/register', usercontroller_1.default.registerUser);
router.post('/superAdmin/login', usercontroller_1.default.loginUser);
exports.default = router;
