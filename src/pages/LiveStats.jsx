import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import {
  FaClipboardCheck,
  FaUserGraduate,
  FaThumbsUp,
  FaStar,
} from "react-icons/fa";

const stats = [
  {
    label: "Assignments Submitted",
    value: 1200,
    suffix: "+",
    icon: <FaClipboardCheck size={36} className="text-purple-500" />,
  },
  {
    label: "Active Students",
    value: 300,
    suffix: "+",
    icon: <FaUserGraduate size={36} className="text-green-500" />,
  },
  {
    label: "Positive Feedback",
    value: 180,
    suffix: "+",
    icon: <FaThumbsUp size={36} className="text-blue-500" />,
  },
  {
    label: "Total Marks Given",
    value: 5000,
    suffix: "+",
    icon: <FaStar size={36} className="text-yellow-500" />,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.8,
      type: "spring",
      stiffness: 120,
    },
  }),
};

const LiveStats = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section
      ref={ref}
      className="relative max-w-7xl mx-auto px-6 py-28 text-center"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-pink-50 -z-10"></div>

      {/* Section Heading */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mb-16"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-2"
        >
          FriendAssign Live Stats
        </motion.h2>
        <p className="mt-2 text-sm md:text-base max-w-2xl mx-auto leading-relaxed text-gray-600">
          Driving student success through timely assignments, constructive
          feedback, and collaboration.
        </p>
      </motion.div>

      {/* Stats Counter */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map(({ label, value, suffix, icon }, index) => (
          <motion.div
            key={label}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            whileHover={{ scale: 1.05 }}
            className="p-6 rounded-2xl bg-white/80 backdrop-blur-xl border border-gray-200 shadow-xl hover:shadow-2xl transition-transform duration-400 cursor-pointer flex flex-col items-center justify-center gap-3"
          >
            <div>{icon}</div>
            <p className="text-3xl md:text-4xl font-semibold text-gray-900">
              {inView ? (
                <CountUp
                  end={value}
                  duration={2.5}
                  suffix={suffix}
                  separator=","
                />
              ) : (
                `0${suffix}`
              )}
            </p>
            <p className="mt-1 text-sm md:text-sm font-medium text-gray-600">
              {label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Decorative Background Blobs */}
      <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-400/20 blur-3xl rounded-full -z-10 animate-pulse-slow"></div>
      <div className="absolute -top-28 right-1/4 w-96 h-96 bg-purple-400/20 blur-3xl rounded-full -z-10 animate-pulse-slow"></div>
    </section>
  );
};

export default LiveStats;
