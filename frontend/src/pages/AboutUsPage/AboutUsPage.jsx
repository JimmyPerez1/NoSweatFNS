export default function AboutUsPage() {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="text-center py-12 bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="max-w-xl mx-auto text-lg mb-6">
          We're more than HVAC. We're family. Discover what sets No Sweat Father & Son apart.
        </p>
        <button className="bg-orange-600 text-white px-6 py-3 rounded hover:bg-orange-700 transition">
          Learn More
        </button>
      </section>

      {/* Company Overview */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-6 py-16 items-center">
        <img src="/readme/screenshots/FNSgroupPhoto.png" alt="Company" className="rounded shadow" />
        <div>
          <h2 className="text-2xl font-semibold mb-2">Who We Are</h2>
          <p>
            No Sweat Father & Son is a proudly family-owned business built on trust, quality, and fast response times.
            We’ve been serving Florida homes for over 20 years, committed to excellence in every project.
          </p>
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 text-center">
          <div>
            <img src="/readme/screenshots/GaugesFNS.png" alt="Founder" className="mx-auto rounded-full w-40 h-40 object-cover mb-4" />
            <h3 className="text-xl font-bold">Founder</h3>
            <p className="text-sm text-gray-600 mt-2">A brief story or quote from the founder here.</p>
          </div>
          <div>
            <img src="/readme/screenshots/workingFNS.png" alt="CEO" className="mx-auto rounded-full w-40 h-40 object-cover mb-4" />
            <h3 className="text-xl font-bold">CEO</h3>
            <p className="text-sm text-gray-600 mt-2">A short bio or mission statement from the CEO.</p>
          </div>
        </div>
      </section>

      {/* Accolades */}
      <section className="py-16 bg-white">
        <h2 className="text-center text-2xl font-semibold mb-8">Awards & Recognition</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-6 px-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="bg-gray-100 p-4 rounded shadow text-center hover:shadow-md transition"
            >
              <img src={`/accolade-${n}.png`} alt={`Award ${n}`} className="mx-auto h-20 mb-2" />
              <p className="text-sm">Award title or description</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-16">
        <h2 className="text-center text-2xl font-semibold mb-10">What Our Clients Say</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-white p-6 rounded shadow-md">
              <p className="italic mb-4">“Testimonial quote goes here from a happy client.”</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full" />
                <div>
                  <p className="font-semibold">Name Lastname</p>
                  <p className="text-sm text-gray-500">Customer</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}