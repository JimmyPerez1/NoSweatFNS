export default function HomePage() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-start text-gray-800">
      {/* Hero Section */}
      <section className="w-full text-center py-20 px-6 bg-white shadow-sm">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Stay Cool. Stay Comfortable.
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-xl mx-auto">
          Reliable HVAC solutions for homes, businesses, and new construction across Florida.
        </p>
        <a
          href="/services"
          className="bg-blue-600 text-white px-6 py-3 rounded-xl text-lg font-medium hover:bg-blue-700 transition"
        >
          View Our Services
        </a>
      </section>

      {/* Mission Statement / Blurb */}
      <section className="max-w-3xl px-4 py-16 text-center">
        <h2 className="text-3xl font-semibold mb-4">Why No Sweat?</h2>
        <p className="text-md md:text-lg text-gray-600">
          Family-owned and operated for over 20 years, we treat your comfort like our own. Trust us to bring fast, reliable service with a personal touch.
        </p>
      </section>

      {/* CTA Footer */}
      <section className="w-full bg-blue-100 py-12 text-center mt-auto">
        <p className="text-xl font-medium mb-4">Need an estimate?</p>
        <a
          href="/#quote"
          className="bg-blue-600 text-white px-6 py-3 rounded-xl text-lg font-medium hover:bg-blue-700 transition"
        >
          Get a Free Quote
        </a>
      </section>
    </div>
  );
}