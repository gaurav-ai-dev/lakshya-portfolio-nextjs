import Contact_1 from "@/components/Contact_1";
import { generatePageMetadata } from "@/lib/seo.config";
import type { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata({
  title: "Contact - Let's Grow Together",
  description: "Get in touch to discuss how data-driven growth marketing strategies can help scale your business efficiently.",
  path: "/contact",
});

const ContactPage = () => {

  return (
    <Contact_1 />
  );
};

export default ContactPage;
