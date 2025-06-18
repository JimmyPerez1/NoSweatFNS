import { useState } from 'react';
import { Wrench, Home, Settings } from 'lucide-react';


const serviceData = {
  Maintenance: [
    { title: 'Seasonal Tune-Up', desc: 'Keep your system running efficiently.' },
    { title: 'Filter Replacement', desc: 'Improve air quality & airflow.' },
  ],
  Installations: [
    { title: 'AC System Install', desc: 'Top brands with warranty.' },
    { title: 'Thermostat Setup', desc: 'Smart home-ready installs.' },
  ],
  Repairs: [
    { title: 'Emergency Repair', desc: '24/7 service to get you cool again.' },
    { title: 'Diagnostics', desc: 'Pinpoint HVAC issues fast.' },
  ],
};

const icons = {
  Maintenance: <Settings className="w-4 h-4 mr-2" />, 
  Installations: <Home className="w-4 h-4 mr-2" />, 
  Repairs: <Wrench className="w-4 h-4 mr-2" />,
};

export default function ServicesPage() {
  const categories = Object.keys(serviceData);
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  return (
    <section className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-4">
          Our Services
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Select a category to learn more about how we can help.
        </p>

        {/* Toggle Buttons */}
        <div className="flex justify-center gap-4 mb-10 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`inline-flex items-center px-6 py-2 rounded-full text-sm font-semibold transition
                ${activeCategory === cat
                  ? 'bg-orange-600 text-white shadow-lg'
                  : 'bg-gray-100 border border-gray-300 text-gray-700 hover:bg-gray-200'}
              `}
            >
              {icons[cat]}
              {cat}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceData[activeCategory].map((service) => (
            <div
              key={service.title}
              className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold text-blue-900 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
