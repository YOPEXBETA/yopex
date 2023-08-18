const axios = require("axios");

const Payment = async (req, res) => {
  const url = "https://developers.flouci.com/api/generate_payment";
  const payload = {
    app_token: "53598d91-0e66-4a64-b320-9b3e57a40719",
    app_secret: process.env.FLOUCI_SECRET,
    amount: req.body.amount,
    accept_card: "true",
    session_timeout_secs: 1200,
    success_link: "http://localhost:3000/success",
    fail_link: "http://localhost:3000/fail",
    developer_tracking_id: "b3db2b71-3d31-4135-922b-cd7d76979066",
  };

  try {
    const result = await axios.post(url, payload);
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
          apppublic: "b9a38d39-a2e6-4928-81bf-8c27eebb9c1e",
          appsecret: process.env.FLOUCI_SECRET,
        },
      },
    );
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
