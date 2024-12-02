import React from "react";
import TopHead from "../Header/TopHead";
import MidHeader from "../Header/MidHeader";

const AboutUs = () => {
  return (
    <div className="bg-gray-50">
      <TopHead />
      <MidHeader />

      {/* Header Section */}
      <header className="text-black py-16">
        <div className="container mx-auto text-center md:flex md:items-center md:justify-between">
          {/* Left Image Box */}
          <div className="md:w-1/2 md:mr-8 mb-8 md:mb-0 flex justify-center">
            <img
              src="https://via.placeholder.com/500"
              alt="About Us"
              className="w-[60%] h-auto rounded-lg shadow-lg"
            />
          </div>

          {/* Right Text Section */}
          <div className="md:w-1/2">
            <h1 className="text-4xl font-bold mb-4">About Us</h1>
            <p className="text-lg mx-auto max-w-3xl leading-relaxed">
              We are a dedicated team committed to providing exceptional services
              and solutions tailored to meet the needs of our clients. With a focus
              on quality, innovation, and customer satisfaction, we strive to exceed
              expectations in everything we do.
              <br />
              <br />
              Our journey began with a simple mission: to make a positive impact
              in our industry by delivering reliable and effective solutions. Today,
              we continue to grow and innovate, ensuring that our clients receive
              the best possible service and support.
            </p>
          </div>
        </div>
      </header>

      {/* Why Choose Us Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Why Choose Us?</h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-8">
            We provide top-notch solutions, exceptional value, and outstanding
            customer service that help you achieve your goals seamlessly.
          </p>
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[ 
              {
                title: "Quality Products",
                description:
                  "We ensure all our products meet the highest standards of quality and reliability.",
                icon: "🔍",
              },
              {
                title: "Affordable Prices",
                description:
                  "We offer competitive pricing without compromising on quality.",
                icon: "💰",
              },
              {
                title: "Excellent Support",
                description:
                  "Our dedicated support team is available to assist you every step of the way.",
                icon: "🤝",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-8 transition-transform transform hover:scale-105 hover:shadow-xl"
              >
                <div className="text-4xl mb-4 text-teal-500">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="bg-teal-50 py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Our Mission</h2>
          <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
            At VendorMart, our mission is to empower our customers with the best
            in technology. We are committed to making shopping seamless, innovative,
            and sustainable. We aim to provide you with the highest level of quality
            and service, ensuring that your experience with us is second to none.
          </p>
        </div>
      </section>

      {/* Tips to Get Offers Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Tips to Get the Best Offers
          </h2>
          <ul className="text-gray-700 max-w-2xl mx-auto leading-8 text-left">
            <li>
              <span className="font-semibold">Subscribe:</span> Sign up for our
              newsletter to receive exclusive discounts and offers.
            </li>
            <li>
              <span className="font-semibold">Follow Us:</span> Get notified of
              flash sales and promotions by following us on social media.
            </li>
            <li>
              <span className="font-semibold">Visit Often:</span> Be sure to
              check our website for seasonal discounts and new product launches.
            </li>
            <li>
              <span className="font-semibold">Loyalty Program:</span> Join our
              rewards program to earn points with every purchase.
            </li>
          </ul>
        </div>
      </section>

     {/* Footer Section */}
     <footer className="bg-gray-800 text-gray-300 py-10">
        <div className="container mx-auto text-center">
          <p className="text-xl font-semibold mb-4">
            "Gratitude is the fairest blossom that springs from the soul." – Henry Ward Beecher
          </p>
          <p className="text-lg mb-4">
            Thank you for choosing us. Your trust and support inspire us every
            day!
          </p>
          <p className="text-gray-400">
            Stay connected for the latest updates and offers.
          </p>
        </div>
      </footer>
      <p className="text-l flex justify-center items-center bg-gray-800 p-[5px] text-white ">
  We love what we do! ❤️ From Rishu
</p>
    </div>
  );
};

export default AboutUs;
