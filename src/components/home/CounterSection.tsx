import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const CounterSection = () => {
  const [counts, setCounts] = useState({ visitors: 0, villas: 0, countries: 0, reviews: 0 });
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  const finalCounts = {
    visitors: 15000,
    villas: 150,
    countries: 25,
    reviews: 4.9
  };

  useEffect(() => {
    if (isInView) {
      const animateCounters = () => {
        const duration = 2000;
        const steps = 60;
        const stepDuration = duration / steps;

        let step = 0;
        const timer = setInterval(() => {
          step++;
          const progress = step / steps;
          
          setCounts({
            visitors: Math.floor(finalCounts.visitors * progress),
            villas: Math.floor(finalCounts.villas * progress),
            countries: Math.floor(finalCounts.countries * progress),
            reviews: Math.min(finalCounts.reviews, (finalCounts.reviews * progress))
          });

          if (step >= steps) {
            clearInterval(timer);
            setCounts(finalCounts);
          }
        }, stepDuration);

        return timer;
      };

      const timer = animateCounters();
      return () => clearInterval(timer);
    }
  }, [isInView]);

  const stats = [
    {
      number: counts.visitors.toLocaleString(),
      label: 'Happy Guests',
      suffix: '+'
    },
    {
      number: counts.villas.toString(),
      label: 'Luxury Villas',
      suffix: '+'
    },
    {
      number: counts.countries.toString(),
      label: 'Countries',
      suffix: ''
    },
    {
      number: counts.reviews.toFixed(1),
      label: 'Average Rating',
      suffix: '/5'
    }
  ];

  return (
    <section className="py-20 bg-sky-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Success in Numbers
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied guests who have experienced luxury with us
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-6xl font-bold text-sky-500 mb-2">
                {stat.number}{stat.suffix}
              </div>
              <div className="text-lg md:text-xl text-gray-700 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CounterSection;