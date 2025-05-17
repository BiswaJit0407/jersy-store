import express from 'express'
import { plcaeOrder,plcaeOrderStripe,plcaeOrderRazorpay,allOrders,userOrders,updateStatus } from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

// Admin Features
orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

// Payment Features
orderRouter.post('/place',authUser,plcaeOrder)
orderRouter.post('/stripe',authUser,plcaeOrderStripe)
orderRouter.post('/razorpay',authUser,plcaeOrderRazorpay)

// User Feature
orderRouter.post('/userorders',authUser,userOrders)

export default orderRouter;