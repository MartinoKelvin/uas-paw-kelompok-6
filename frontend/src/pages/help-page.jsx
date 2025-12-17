import MainLayout from "@/layout/main-layout";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MessageCircle, Book, CreditCard, MapPin } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSEO } from "@/hooks/use-seo";

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useSEO({
    title: "Help Center",
    description:
      "Find answers to frequently asked questions about booking, payments, packages, and more. Get help with your Wonderfull Inn travel plans.",
    keywords: "help center, faq, travel booking help, payment questions, customer support",
  });

  const categories = [
    {
      icon: Book,
      title: "Booking",
      description: "Learn how to book packages",
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      icon: CreditCard,
      title: "Payment",
      description: "Payment methods and billing",
      color: "bg-green-500/10 text-green-500",
    },
    {
      icon: MapPin,
      title: "Travel Tips",
      description: "Destination guides and tips",
      color: "bg-purple-500/10 text-purple-500",
    },
    {
      icon: MessageCircle,
      title: "Support",
      description: "Get help from our team",
      color: "bg-orange-500/10 text-orange-500",
    },
  ];

  const faqs = [
    {
      question: "How do I book a travel package?",
      answer:
        "To book a package, browse our packages page, select your desired package, choose your travel dates and number of travelers, then click 'Book Now'. You'll need to sign in or create an account to complete your booking.",
    },
    {
      question: "Can I cancel or modify my booking?",
      answer:
        "Yes, you can cancel or modify your booking through your dashboard. Cancellation policies vary by package. Please check the specific package details for cancellation terms. Most packages allow free cancellation up to 48 hours before departure.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express), debit cards, and PayPal. Payment is processed securely through our encrypted payment gateway.",
    },
    {
      question: "How do I become a travel agent on your platform?",
      answer:
        "To become a travel agent, sign up with the 'Agent' role during registration. Once approved, you'll be able to create and manage travel packages, view bookings, and manage customer reviews through your agent dashboard.",
    },
    {
      question: "Are the travel packages customizable?",
      answer:
        "Some packages offer customization options. Contact the travel agent directly through the package details page to discuss your specific requirements. Many agents are happy to tailor packages to your needs.",
    },
    {
      question: "What is included in the package price?",
      answer:
        "Package inclusions vary by destination and agent. Typically, packages include accommodation, guided tours, and some meals. Check the package itinerary for detailed information about what's included and what's not.",
    },
    {
      question: "How far in advance should I book?",
      answer:
        "We recommend booking at least 2-4 weeks in advance for domestic destinations and 1-2 months for international trips. This ensures better availability and allows time for necessary travel arrangements.",
    },
    {
      question: "What if I need to contact my travel agent?",
      answer:
        "You can contact your travel agent through your booking details page. The agent's contact information will be provided once your booking is confirmed. You can also reach out through our customer support team.",
    },
    {
      question: "Do you offer travel insurance?",
      answer:
        "We recommend purchasing travel insurance separately. Some of our travel agents can help arrange insurance for you. Travel insurance typically covers trip cancellation, medical emergencies, and lost luggage.",
    },
    {
      question: "How do I leave a review?",
      answer:
        "After completing your trip, you can leave a review by going to your booking history in your dashboard and clicking 'Write Review' on the completed booking. Your feedback helps other travelers make informed decisions.",
    },
  ];

  return (
    <MainLayout>
      <section className="space-y-12 py-2 md:py-8">
        {/* Header */}
        <div className="space-y-6 text-center">
          <h1 className="text-foreground text-2xl leading-tight font-bold md:text-4xl lg:text-5xl">
            How Can We Help You?
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-sm md:text-lg">
            Find answers to common questions or get in touch with our support team
          </p>

          {/* Search Bar */}
          <div className="mx-auto max-w-2xl">
            <div className="relative">
              <Search className="text-muted-foreground absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2" />
              <Input
                placeholder="Search for help..."
                className="pl-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <Card
              key={index}
              className="border-border cursor-pointer transition-shadow hover:shadow-lg"
            >
              <CardContent className="p-6">
                <div className={`${category.color} mb-4 inline-flex rounded-lg p-3`}>
                  <category.icon className="h-6 w-6" />
                </div>
                <h3 className="text-foreground mb-2 text-lg font-bold">{category.title}</h3>
                <p className="text-muted-foreground text-sm">{category.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-foreground text-2xl font-bold md:text-3xl">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground mt-2 text-sm md:text-base">
              Quick answers to questions you may have
            </p>
          </div>

          <Card className="border-border">
            <CardContent className="p-6 md:p-8">
              <Accordion type="single" collapsible className="w-full">
                {faqs
                  .filter(
                    (faq) =>
                      searchQuery === "" ||
                      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left text-sm md:text-base">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-sm">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        {/* Contact CTA */}
        <Card className="border-primary bg-primary/5 border">
          <CardContent className="p-8 text-center md:p-12">
            <MessageCircle className="text-primary mx-auto mb-4 h-12 w-12" />
            <h2 className="text-foreground mb-4 text-2xl font-bold md:text-3xl">
              Still Need Help?
            </h2>
            <p className="text-muted-foreground mx-auto mb-6 max-w-2xl text-sm md:text-base">
              Can't find what you're looking for? Our support team is here to help you 24/7.
            </p>
            <Button
              onClick={() => navigate("/contact")}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              size="lg"
            >
              Contact Support
            </Button>
          </CardContent>
        </Card>
      </section>
    </MainLayout>
  );
}
