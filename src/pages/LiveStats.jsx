import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { motion } from "framer-motion";

const stats = [
  { label: "Assignments Submitted", value: 1200, suffix: "+" },
  { label: "Active Students", value: 300, suffix: "+" },
  { label: "Positive Feedback", value: 180, suffix: "+" },
  { label: "Total Marks Given", value: 5000, suffix: "+" },
];

const LiveStats = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section
      ref={ref}
      className="relative max-w-7xl mx-auto px-6 py-24 overflow-hidden"
    >
      {/* Soft background effect */}
      <div className="absolute inset-0 -z-10 backdrop-blur-3xl opacity-40"></div>

      {/* Section Heading */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
          FriendAssign Live Stats
        </h2>
        <p className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed opacity-80">
          Empowering students through assignments, feedback, and collaboration.
        </p>
      </motion.div>

      {/* Stats Counter */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10"
      >
        {stats.map(({ label, value, suffix }) => (
          <motion.div
            key={label}
            whileHover={{ scale: 1.05, y: -6 }}
            transition={{ type: "spring", stiffness: 250 }}
            className="p-8 rounded-2xl border border-gray-300/30 backdrop-blur-xl text-center shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <p className="text-5xl font-extrabold tracking-tight">
              {inView ? (
                <CountUp
                  end={value}
                  duration={3}
                  suffix={suffix}
                  separator=","
                />
              ) : (
                `0${suffix}`
              )}
            </p>
            <p className="mt-3 text-sm md:text-base font-medium opacity-70">
              {label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default LiveStats;
