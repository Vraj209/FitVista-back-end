import paypal from "paypal-rest-sdk";

const payment = async (req, res) => {
  try {
    paypal.configure({
      mode: "sandbox", //sandbox or live
      client_id:
        "AbVFhUp15XX72t3NY-WGW9OJUv5cN0hJfIhLDJkDRj-psh8vsmtWR2wQ2TW6cNL5HE6bHfuVTzGGMv14",
      client_secret:
        "EC0xQihBCor9xICx-YJJh0fUpClXRIbtHb9bHRS69Clwl22O-eZKi9K-ickI5nSZ-Z3jEGBdrTg4PzKq",
    });

    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel",
      },
      transactions: [
        {
          item_list: {
            items: [
              {
                name: "Training",
                sku: "001",
                price: "25.00",
                currency: "USD",
                quantity: 1,
              },
            ],
          },
          amount: {
            currency: "USD",
            total: "25.00",
          },
          description: "Payment Training",
        },
      ],
    };
    if (create_payment_json) {
      paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
          throw error;
        } else {
          for (let i = 0; i < payment.links.length; i++) {
            if (payment.links[i].rel === "approval_url") {
              res.redirect(payment.links[i].href);
            }
          }
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error, Status: 500 });
  }
};

const success = async (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: "USD",
          total: "25.00",
        },
      },
    ],
  };
};
export { payment, success };
