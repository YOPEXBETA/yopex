const axios = require("axios");
const userModel = require("../models/user.model");
const paymentModel = require("../models/payment.model");
const ChallengeModel = require("../models/Challenge.model");

const Payment = async (req, res) => {
  console.log(process.env.CLIENT8SERVER);
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3006"
      : "https://yopexhub.com";
  const url =
    "https://api.preprod.konnect.network/api/v2/payments/init-payment";
  const payload = {
    receiverWalletId:
      process.env.NODE_ENV === "development"
        ? "65d77771a95d70622d8e752b"
        : "6632650da0d11b10ddb8f9ae",
    token: "TND",
    amount: req.body.amount,
    type: "immediate",
    description: "challenge payment",
    acceptedPaymentMethods: ["wallet", "bank_card", "e-DINAR"],
    lifespan: 10,
    checkoutForm: false,
    addPaymentFeesToAmount: true,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    silentWebhook: true,
    successUrl: baseUrl + "/paymentSuccess",
    failUrl: baseUrl + "/challenges?error=payment_failed",
    theme: "light",
  };

  try {
    console.log(payload);
    const result = await axios.post(url, payload, {
      headers: {
        "x-api-key":
          process.env.NODE_ENV === "development"
            ? "65d77771a95d70622d8e7527:0lsHduILshHQoOfssPcru"
            : "6632650da0d11b10ddb8f9aa:SiqKOa86oiu0njEEp",
      },
    });

    const payment = new paymentModel({
      user: req.userId,
      balance: req.body.amount,
      payment_id: result.data.paymentRef,
      state: "in progress",
    });
    const challenge = await ChallengeModel.findById(req.body.challengeId);
    challenge.paymentId = result.data.paymentRef;
    challenge.save();

    await payment.save();
    await userModel.findByIdAndUpdate(req.userId, {
      $push: {
        historyPayment: payment._id,
      },
    });

    return res.status(200).json(result.data);
  } catch (err) {
    return res.status(500).send("An error occurred");
  }
};

const Verify = async (req, res) => {
  const id_payment = req.params.id;

  try {
    const result = await axios.get(
      `https://api.preprod.konnect.network/api/v2/payments/${id_payment}`
    );

    const payment = await paymentModel.findOne({
      user: req.userId,
      payment_id: id_payment,
    });
    if (!payment) {
      return res.status(404).send("Not found");
    }
    const url = process.env.CLIENT8SERVER + "/challenges";
    if (result.data.payment.successfulTransactions == 1) {
      if (payment.state === "in progress" || payment.state === "success") {
        payment.state = "success";
        await payment.save();
        ChallengeModel.findOneAndUpdate(
          {
            paymentId: id_payment,
          },
          { verified: true }
        ).exec();

        res.status(200).json(url + "?success=payment_success");
      }
    } else {
      if (payment) {
        payment.state = "fail";
        await payment.save();
        res.status(200).json(url + "?error=payment_failed");
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
};

module.exports = {
  Payment,
  Verify,
};
