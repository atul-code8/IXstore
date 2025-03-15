import Stripe from "stripe";
import { config } from "dotenv";

config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = (items) => {
  let total = 0;
  items.forEach((item) => {
    total += item.amount;
  });
  return total;
};



const createIntent = async (req, res) => {
    const { items } = req.body;
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: items.map((item) => ({
          price_data: {
            currency: "usd",
            product_data: {
              name: item.title,
              // images: [item.image],
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        })),
        mode: "payment",
        // success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        success_url: `${process.env.FRONTEND_URL}/cart?success=true`,
        cancel_url: `${process.env.FRONTEND_URL}/cart?canceled=true`,
      });
  
      res.json({ id: session.id });
    } catch (error) {
      res.status(500).send({ error: "Something went wrong", error });
    }
  }

const createSession = async (req, res) => {
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
            tax_behavior: "exclusive",
          },
          quantity: 1,
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
            maximum: 10,
          },
        },
      ],
      mode: "payment",
      shipping_address_collection: {
        allowed_countries: ["US"],
      },
      consent_collection: {
        terms_of_service: "required",
      },
      custom_text: {
        // shipping_address: {
        //   message: 'Please note that we can\'t guarantee 2-day delivery for PO boxes at this time.',
        // },
        // after_submit: {
        //   message: 'Learn more about **your purchase** on our [product page](https://www.stripe.com/).',
        // },
        terms_of_service_acceptance: {
          message:
            "I agree to the [Terms of Service](http://localhost:8080/terms)",
        },
      },
  
      return_url: `http://localhost:5173/return?session_id={CHECKOUT_SESSION_ID}`,
    });
    res.send({ clientSecret: session.client_secret });
  }

const sessionStatus = async (req, res) => {
    const session = await stripe.checkout.sessions.retrieve(
      req.query.session_id,
      {
        expand: ["line_items"],
      }
    );
  
    res.send({
      status: session.payment_status,
      customer_email: session.customer_details.email,
      line_items: session.line_items,
    });
  }

export {createIntent, createSession, sessionStatus}