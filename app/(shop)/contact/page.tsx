"use client";

import Image from "next/image";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-black">
      {/* Contact Hero Section */}
      <section className="bg-white py-20 text-center shadow-md">
        <h1 className="text-5xl font-bold mb-4">CONTACT US</h1>
        <p className="text-gray-700 text-lg max-w-2xl mx-auto">
          We'd love to hear from you! Reach out to us for any questions or
          inquiries.
        </p>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid md:grid-cols-2 gap-16">
        {/* Left Column: Store, Careers, Subscribe */}
        <div className="space-y-12">
          {/* Our Store */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold mb-4">Our Store</h2>
            <p className="text-lg mb-2 font-medium">54709 Willms Station</p>
            <p className="text-lg mb-2 font-medium">
              Suite 350, Washington, USA
            </p>
            <p className="text-lg mb-2 font-medium">Tel: (415) 555-0132</p>
            <p className="text-lg mb-2 font-medium">Email: maleesha@gmail.com</p>
          </div>

          {/* Careers */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold mb-4">Careers at Forever</h2>
            <p className="text-gray-700 mb-4">
              Learn more about our teams and job openings.
            </p>
            <a
              href="#"
              className="inline-block mt-3 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Explore Jobs
            </a>
          </div>

          {/* Subscribe */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold mb-4">
              Subscribe now & get 20% off
            </h2>
            <p className="text-gray-700 mb-4">
              Stay updated with our latest products and offers.
            </p>
            <div className="flex max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-600 text-white px-6 py-2 rounded-r-lg hover:bg-blue-700 transition font-semibold">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: About & Images */}
        <div className="space-y-8">
          {/* About Our Company */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold mb-4">About Our Company</h2>
            <p className="text-gray-700">
              We are committed to providing the best products and services.
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. It has been the industry's standard dummy text since the
              1500s.
            </p>
          </div>

          {/* Company Images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative h-56 w-full rounded-xl overflow-hidden shadow hover:shadow-lg transition">
              <Image
                src="https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=800&q=80"
                alt="Company"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-56 w-full rounded-xl overflow-hidden shadow hover:shadow-lg transition">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
                alt="Company"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
