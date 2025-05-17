import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Placing orders using COD Method
const plcaeOrder = async(req,res) => {

    try {
        
        const { userId, items, amount, address}= req.body;

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod:"COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId,{cartData:{}})

        res.json({success:true,message:"Order Placed"})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }

}

// Placing orders using Stripe Method
const plcaeOrderStripe = async(req,res) => {

}

// Placing orders using Razorpay Method
const plcaeOrderRazorpay = async(req,res) => {

}

//All Orders data for Admin panel
const allOrders = async(req,res)=>{

    try {
        
        const orders = await orderModel.find({})
        res.json({success:true,orders})

    } catch (error) {
        console.log(error)
        res.json({successa:false, message:error.message})
    }

}

//All Orders data for frontend
const userOrders = async(req,res)=>{
    try {
        
        const{userId}= req.body

        const orders = await orderModel.find({userId})
        res.json({success:true, orders})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
} 

//update order status from Admin Panel
const updateStatus = async(req,res)=>{
    try {
        
        const {orderId, status} = req.body

        await orderModel.findByIdAndUpdate(orderId, {status})
        res.json({success:true, message:'status Updated'})

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

export {plcaeOrder,plcaeOrderStripe,plcaeOrderRazorpay,allOrders,userOrders,updateStatus}