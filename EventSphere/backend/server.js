import express from 'express'
import dotenv from 'dotenv'
import chalk from 'chalk';
import cors from 'cors'
import ConnectToDB from './config/ConnectToDB.js';
import userRouter from './routers/UserRouter.js';
import ExpoRouter from './routers/ExpoRouter.js';
import BoothRouter from './routers/BoothRouter.js';
import BoothassignRouter from './routers/BoothassignRouter.js';
import ScheduleRouter from './routers/ScheduleRouter.js';
import ExhibitorRouter from './routers/ExhibitorRouter.js';
import summaryRouter from './routers/SummaryRouter.js';
import ScheduleBookmarkRouter from './routers/ScheduleBookmark.js';
import AttendeExpoRegRouter from './routers/ExpoRegisterRouterByattendee.js';
import AttendeeScheduleRegRouter from './routers/ScheduleRegRouter.js';
import ChartSummaryRouter from './routers/ChartSummaryRouter.js';
import ApplicationRouter from './routers/ApplicationRouter.js';
import MessageRoutes from './routers/MessageRouter.js';
import CollaborationRouter from './routers/CollaborationRouter.js';
import AdminContactrouter from './routers/AdminContactRouter.js';



dotenv.config();

ConnectToDB();
const app = express();
app.use(express.json());
// app.use(cors());
const allowedOrigins = ['http://localhost:5174', 'http://localhost:3000', 'http://localhost:5173']; // Add all allowed frontends

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(express.static('public'))
app.use("/uploads", express.static("uploads"));


app.use('/', userRouter)
app.use('/expo', ExpoRouter)
app.use('/booth', BoothRouter)
app.use('/boothassign', BoothassignRouter)
app.use('/schedule', ScheduleRouter)
app.use('/exhibitor', ExhibitorRouter)
app.use('/dashboard', summaryRouter)
app.use('/schedulebookmark', ScheduleBookmarkRouter)
app.use('/attendeeexporeg', AttendeExpoRegRouter)
app.use('/attendeeeschedulereg', AttendeeScheduleRegRouter)
app.use('/chartsummary', ChartSummaryRouter)
app.use('/application', ApplicationRouter);
app.use('/api/messages', MessageRoutes);
app.use('/api/collaboration', CollaborationRouter);
app.use('/api/admincontact', AdminContactrouter);












app.listen(process.env.PORT, () => {

    console.log(chalk.cyan.bold(`Server running at http://localhost:${process.env.PORT}`));
})