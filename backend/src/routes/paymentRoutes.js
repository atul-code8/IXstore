import { Router } from "express";
import Stripe from "stripe";

const router = Router();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = (items) => {
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  let total = 0;
  items.forEach((item) => {
    total += item.amount;
  });
  return total;
};

// router.post("/create-payment-intent", async (req, res) => {
//   const { items } = req.body;

//   // Create a PaymentIntent with the order amount and currency
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: calculateOrderAmount(items),
//     currency: "usd",
//     automatic_payment_methods: {
//       enabled: true,
//     },
//   });

//   res.send({
//     clientSecret: paymentIntent.client_secret,
//     // [DEV]: For demo purposes only, you should avoid exposing the PaymentIntent ID in the client-side code.
//     dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
//   });
// });

// Create a Stripe session route

router.post('/create-checkout-intent', async (req, res) => {
  const { items } = req.body;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
          },
          unit_amount: (item.price) * 100,
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `http://localhost:5173/success`, // Add your success page route
      cancel_url: `http://localhost:5173/cancel`,   // Add your cancel page route
    });

    res.json({ id: session.id });
  } catch (error) {
    res.status(500).send({ error: 'Something went wrong' });
  }
});

router.post("/create-checkout-session", async (req, res) => {
  const { item } = req.body;
  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.id,
            description: "A brief description of the product",
            images: ["https://i.imgur.com/EHyR2nP.png"],
          },
          unit_amount: item.amount,
          tax_behavior: "exclusive"
        },
        quantity: 1,
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
          maximum: 10
        },
      },
    ],    
    mode: "payment",
    shipping_address_collection: {
      allowed_countries: ['US'],
    },
    consent_collection: {
      terms_of_service: 'required',
    },
    custom_text: {
      // shipping_address: {
      //   message: 'Please note that we can\'t guarantee 2-day delivery for PO boxes at this time.',
      // },
      // after_submit: {
      //   message: 'Learn more about **your purchase** on our [product page](https://www.stripe.com/).',
      // },
      terms_of_service_acceptance: {
        message: 'I agree to the [Terms of Service](http://localhost:8080/terms)',
      },
    },
    
    return_url: `http://localhost:5173/return?session_id={CHECKOUT_SESSION_ID}`,

  });
  res.send({ clientSecret: session.client_secret });
});

router.get("/session-status", async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

  res.send({
    status: session.status,
    customer_email: session.customer_details.email,
  });
});

export default router;
