import express from 'express'
import chartsummary from '../controllers/ChartSummaryController.js';

const ChartSummaryRouter = express();


ChartSummaryRouter.get('/', chartsummary)




export default ChartSummaryRouter;
