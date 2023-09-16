const { log } = require("@tensorflow/tfjs");
const axios = require("axios");
const userModel = require("../models/user.model");

const Payment = async (req, res) => {
  const url = "https://developers.flouci.com/api/generate_payment";
  const payload = {
    app_token: "276cd1fa-98fc-40b8-8740-0028523dacc3",
    app_secret: process.env.FLOUCI_SECRET,
    amount: req.body.amount*1000,
    accept_card: "true",
    session_timeout_secs: 1200,
    success_link: "http://localhost:3000/store",
    fail_link: "http://localhost:3000/store",
    developer_tracking_id: "3d6c3855-88b9-481f-9c00-43c8b8745f80",
  };

  try {
    const result = await axios.post(url, payload);
    console.log("flouci",req.userId);
    await userModel.findByIdAndUpdate(req.userId, {
          $push: { historyPayment: {payment_id:result.data.result.payment_id, balanace: req.body.amount, state: "in progress"} },
    });

    res.send(result.data);
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred");
  }
};

const Verify = async (req, res) => {
  const id_payment = req.params.id;

  try {
    const result = await axios.get(
      `https://developers.flouci.com/api/verify_payment/${id_payment}`,{
        headers: {
          'Content-Type': 'application/json',
          'apppublic': "276cd1fa-98fc-40b8-8740-0028523dacc3",
          'appsecret': process.env.FLOUCI_SECRET,
        },}
    );

    const user = await userModel.findById(req.userId);
      
    const index = user.historyPayment.findIndex(
      (payment) => payment.payment_id === id_payment && payment.state === "in progress"
    );
    
    if (result.data.result.status === "SUCCESS") {
      
      
      if (index !== -1) {
        
        user.balance += user.historyPayment[index].balanace;
        user.historyPayment.splice(index, 1);
        user.historyPayment.push({payment_id:id_payment, balanace: req.body.amount, state: "success"});
        
      }
      
    }else{
      if (index !== -1) {
        user.historyPayment[index].state = "fail";
        
      }
    }
    await user.save();
    
    
    res.json(result.data);
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred");
  }
};

module.exports = {
  Payment,
  Verify,
};
