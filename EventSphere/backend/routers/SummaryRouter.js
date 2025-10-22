
import express from "express";
import getDashboardSummary from "../controllers/SummaryController.js";

const summaryRouter = express.Router();

summaryRouter.get("/summary", getDashboardSummary);

export default summaryRouter;
