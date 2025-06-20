export default function FaqPage() {
  return (
    <div className="bg-white text-gray-800 py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

        <div>
          <h1 className="text-4xl font-bold mb-4 text-blue-900">FAQ</h1>
          <p className="mb-6 text-gray-600">Common questions answered — and what you need to know about working with No Sweat Father & Son.</p>

          <div className="aspect-w-16 aspect-h-9 w-full rounded shadow-lg overflow-hidden">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="FAQ Video"
              className="w-full h-full"
              allowFullScreen
            ></iframe>
          </div>
        </div>


        <div className="space-y-8">
          {[
            {
              q: 'How quickly can you respond to service calls?',
              a: 'We offer same-day service whenever possible. Because every hour without AC matters in Florida.'
            },
            {
              q: 'Do you offer financing?',
              a: 'Yes, flexible financing plans are available for new installs and repairs. Contact us for details.'
            },
            {
              q: 'What areas do you serve?',
              a: 'We proudly serve Tampa and surrounding counties. If you’re unsure, just give us a call.'
            },
            {
              q: 'Do you work with commercial clients?',
              a: 'Yes, we work with residential, commercial, and multi-family properties.'
            },
          ].map(({ q, a }, i) => (
            <div key={i}>
              <h3 className="text-lg font-semibold text-blue-900">{q}</h3>
              <p className="text-gray-600 mt-2">{a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}