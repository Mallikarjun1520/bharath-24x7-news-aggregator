"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const newsController_1 = require("../controllers/newsController");
const Article_1 = __importDefault(require("../models/Article"));
const router = express_1.default.Router();
/* GET CATEGORY NEWS */
router.get("/category/:category", newsController_1.getNewsByCategory);
/* TRACK INTERACTION */
router.post("/interact/:id", async (req, res) => {
    try {
        await Article_1.default.findByIdAndUpdate(req.params.id, {
            $inc: { interactionCount: 1 }
        });
        res.json({ success: true });
    }
    catch (error) {
        console.error("Interaction error:", error);
        res.status(500).json({ error: "Failed" });
    }
});
exports.default = router;
