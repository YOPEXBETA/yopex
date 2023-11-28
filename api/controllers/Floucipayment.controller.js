const axios = require("axios");
const userModel = require("../models/user.model");
const paymentModel = require("../models/payment.model");

const Payment = async (req, res) => {
  const url = "https://developers.flouci.com/api/generate_payment";
  const payload = {
    app_token: "276cd1fa-98fc-40b8-8740-0028523dacc3",
    app_secret: process.env.FLOUCI_SECRET,
    amount: req.body.amount * 1000,
    accept_card: "true",
    session_timeout_secs: 1200,
    success_link: process.env.CLIENT8SERVER + "/store",
    fail_link: process.env.CLIENT8SERVER + "/store",
    developer_tracking_id: "3d6c3855-88b9-481f-9c00-43c8b8745f80",
  };

  try {
    const result = await axios.post(url, payload);
    console.log("flouci", req.userId);
    const payment = new paymentModel({
      user: req.userId,
      balanace: req.body.amount,
      payment_id: result.data.result.payment_id,
      state: "in progress",
    });
    await payment.save();
    await userModel.findByIdAndUpdate(req.userId, {
      $push: { historyPayment: payment._id },
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
      `https://developers.flouci.com/api/verify_payment/${id_payment}`,
      {
        headers: {
          "Content-Type": "application/json",
          apppublic: "276cd1fa-98fc-40b8-8740-0028523dacc3",
          appsecret: process.env.FLOUCI_SECRET,
        },
      }
    );

    const user = await userModel.findById(req.userId);
    const payment = await paymentModel.findOne({
      user: req.userId,
      payment_id: id_payment,
    });

    if (result.data.result.status === "SUCCESS") {
      if (payment && payment.state === "in progress") {
        user.balance += payment.balanace;
        payment.state = "success";
        await payment.save();
      }
    } else {
      if (payment) {
        payment.state = "fail";
        await payment.save();
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
