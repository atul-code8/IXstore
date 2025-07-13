import * as React from "react"
import { useState } from "react"
import { ChatBubbleLeftIcon, ClockIcon, EnvelopeIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/24/outline"

const faqs = [
  {
    question: "How do I track my order?",
    answer:
      "You can track your order by logging into your account and visiting the 'Orders' section in your dashboard. Alternatively, you can use the tracking number provided in your shipping confirmation email.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy for most items. Products must be returned in their original condition and packaging. Some products, such as personalized items, may not be eligible for return.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Standard shipping typically takes 3-5 business days within the continental US. Express shipping options are available at checkout for faster delivery. International shipping times vary by destination.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location. Import duties and taxes may apply and are the responsibility of the customer.",
  },
  {
    question: "How can I change or cancel my order?",
    answer:
      "You can request changes or cancellation by contacting our customer support team within 1 hour of placing your order. Once an order has been processed, it cannot be modified or canceled.",
  },
]

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate form submission
    setFormSubmitted(true)
    setTimeout(() => {
      setFormSubmitted(false)
    }, 3000)
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Contact & Support</h1>
          <p className="mt-4 text-muted-foreground">
            We're here to help. Reach out to our team for assistance with your orders, products, or any questions you
            might have.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 mb-12">
          <div className="overflow-hidden">
            <div className="bg-primary/10 p-4">
              <PhoneIcon className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-medium">Call Us</h3>
              <p className="text-sm text-muted-foreground">Speak directly with our support team</p>
            </div>
            <div className="space-y-2">
              <p className="font-medium">+1 (888) 123-4567</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ClockIcon className="h-4 w-4" />
                <span>Mon-Fri, 9am-6pm EST</span>
              </div>
              <button type="button" variant="outline" className="w-full px-4 py-2 rounded-md border mt-2">
                Call Now
              </button>
            </div>
          </div>

          <div className="overflow-hidden">
            <div className="bg-primary/10 p-4">
              <EnvelopeIcon className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-medium">Email Us</h3>
              <p className="text-sm text-muted-foreground">Send us a message anytime</p>
            </div>
            <div className="space-y-2">
              <p className="font-medium">support@example.com</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ClockIcon className="h-4 w-4" />
                <span>24/7 Support</span>
              </div>
              <button type="button" variant="outline" className="w-full px-4 py-2 rounded-md border mt-2">
                Email Now
              </button>
            </div>
          </div>

          <div className="overflow-hidden">
            <div className="bg-primary/10 p-4">
              <ChatBubbleLeftIcon className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-medium">Live Chat</h3>
              <p className="text-sm text-muted-foreground">Chat with our support agents</p>
            </div>
            <div className="space-y-2">
              <p className="font-medium">Start a conversation</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ClockIcon className="h-4 w-4" />
                <span>Available 24/7</span>
              </div>
              <button type="button" className="w-full bg-black text-white px-4 py-2 rounded-md mt-2">Start Chat</button>
            </div>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 mb-12">
          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-6">Get in Touch</h2>
            <div>
              {/* <CardContent className="p-6">
                <Tabs defaultValue="contact">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="contact">Contact Us</TabsTrigger>
                    <TabsTrigger value="support">Support Request</TabsTrigger>
                  </TabsList>

                  <TabsContent value="contact">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="first-name">First name</Label>
                          <Input id="first-name" placeholder="First name" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="last-name">Last name</Label>
                          <Input id="last-name" placeholder="Last name" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="Email address" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input id="subject" placeholder="How can we help you?" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          placeholder="Please provide as much detail as possible..."
                          rows={5}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full" disabled={formSubmitted}>
                        {formSubmitted ? (
                          <>
                            <Check className="mr-2 h-4 w-4" />
                            Message Sent!
                          </>
                        ) : (
                          "Send Message"
                        )}
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="support">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="support-email">Email</Label>
                        <Input id="support-email" type="email" placeholder="Email address" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="order-number">Order Number (if applicable)</Label>
                        <Input id="order-number" placeholder="e.g. ORD-12345" />
                      </div>
                      <div className="space-y-2">
                        <Label>Issue Type</Label>
                        <RadioGroup defaultValue="order">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="order" id="order" />
                            <Label htmlFor="order">Order Issue</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="product" id="product" />
                            <Label htmlFor="product">Product Question</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="return" id="return" />
                            <Label htmlFor="return">Return/Refund</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="other" id="other" />
                            <Label htmlFor="other">Other</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="support-message">Details</Label>
                        <Textarea
                          id="support-message"
                          placeholder="Please describe your issue in detail..."
                          rows={5}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full" disabled={formSubmitted}>
                        {formSubmitted ? (
                          <>
                            <Check className="mr-2 h-4 w-4" />
                            Request Submitted!
                          </>
                        ) : (
                          "Submit Support Request"
                        )}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent> */}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-6">Frequently Asked Questions</h2>
            <div>
              <div className="p-6">
                {/* <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion> */}

                <hr className="my-6" />

                <div className="text-center">
                  <h3 className="text-lg font-medium mb-2">Still have questions?</h3>
                  <p className="text-muted-foreground mb-4">Our support team is just a click away.</p>
                  <button type="button">Contact Support</button>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div>
                <h3 className="flex items-center gap-2">
                  <MapPinIcon className="h-5 w-5" />
                  Our Location
                </h3>
              </div>
              <div>
                <div className="rounded-md border overflow-hidden h-[200px] bg-muted flex items-center justify-center">
                  <p className="text-muted-foreground">Map goes here</p>
                </div>
                <div className="mt-4">
                  <p className="font-medium">E-Shop Headquarters</p>
                  <p className="text-muted-foreground">
                    123 Commerce Street
                    <br />
                    New York, NY 10001
                    <br />
                    United States
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
