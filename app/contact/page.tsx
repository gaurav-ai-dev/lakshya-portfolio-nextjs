import type { Metadata } from "next";
import Contact_1 from "@/components/Contact_1";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Hire a Freelance SEO Consultant in USA | Contact Lakshya Pareek",
    description:
      "Ready to grow your organic traffic? Contact Lakshya Pareek — freelance SEO consultant in the USA — for a free SEO audit and personalized growth strategy.",
    keywords: [
      "Hire SEO Consultant USA",
      "Freelance SEO Expert Contact",
      "Free SEO Audit",
      "SEO Consultant USA",
    ],
    alternates: { canonical: "https://seofreelancerusa.com/contact" },
    openGraph: {
      type: "website",
      url: "https://seofreelancerusa.com/contact",
      title: "Hire a Freelance SEO Consultant in USA | Contact Lakshya Pareek",
      description:
        "Contact Lakshya Pareek for a free SEO audit and organic growth strategy tailored to your business.",
      siteName: "Lakshya Pareek",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Contact Lakshya Pareek" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Contact Lakshya Pareek | Freelance SEO Consultant USA",
      description: "Get a free SEO audit — contact Lakshya Pareek today.",
      images: ["/og-image.jpg"],
    },
  };
}

const ContactPage = () => {

  return (
    <Contact_1 />
  );
};

export default ContactPage;
