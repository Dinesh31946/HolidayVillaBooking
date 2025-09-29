import { motion } from 'framer-motion';

const locations = [
  {
    id: 1,
    name: 'Lonavala',
    image: '/images/lonavala-1.jpg',
    highlight: 'Scenic hill station with breathtaking valley views.'
  },
  {
    id: 2,
    name: 'Alibuag',
    image: '/images/alibaug-1.jpg',
    highlight: 'Coastal charm with sun-kissed beaches and historic forts'
  },
  {
    id: 3,
    name: 'Mahabaleshwar',
    image: '/images/mahabaleshwar.jpg',
    highlight: 'Lush green hills and famous strawberry farms.'
  }
];

const VillaLocations = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Discover Our Destinations
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From tropical beaches to mountain retreats, find your perfect escape
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-8">
          {locations.map((location, index) => (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300">
                <img
                  src={location.image}
                  alt={location.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">{location.name}</h3>
                  <p className="text-sm opacity-90">{location.highlight}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VillaLocations;