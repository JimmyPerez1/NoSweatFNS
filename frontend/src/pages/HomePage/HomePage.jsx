import Footer from '../../components/Footer/Footer';

export default function HomePage() {
  return (
 <div className="relative h-[45vh] w-full overflow-hidden">
      {/* Background Video */}
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

      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4 bg-black/40">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
          No Sweat Father & Son
        </h1>
        <p className="text-xl md:text-2xl mb-6 italic drop-shadow">
          “We sweat so you don’t have to.”
        </p>
        <a
          href="/signup"
          className="bg-white text-black font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition"
        >
          Join the Family
        </a>
      </div>
    </div>
  );
}