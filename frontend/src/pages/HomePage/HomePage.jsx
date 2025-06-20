

export default function HomePage() {
  return (
    <div>

            <section className="relative h-screen w-full overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/homepageVideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>


      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4 bg-blue-900/20">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
          No Sweat Father & Son
        </h1>
        <p className="text-xl md:text-2xl mb-6 italic drop-shadow">
          “We sweat so you don’t have to.”
        </p>
        <a
          href="/signup"
          className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition"
        >
          Join the Family
        </a>

      </div>
    </section>

      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto grid gap-8 grid-cols-1 md:grid-cols-3 px-6 text-center">
          {['Maintenance & Repairs', 'New System Installs', 'Deals and Finance options'].map((title) => (
            <div key={title} className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-600">Brief description of {title.toLowerCase()} services.</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}