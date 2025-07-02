import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const textVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  hover: { scale: 1.05, color: "#60a5fa", transition: { duration: 0.3 } },
};

const Benifit = () => {
  const navigate = useNavigate();

  const items = [
    "👥 Collaborative Group Study",
    "📝 Create & Submit Assignments",
    "🎓 Peer-to-Peer Grading",
    "📅 Track Progress",
    "🔒 Secure User Access",
    "📱 Responsive Interface",
  ];

  const handleJoinUsClick = () => {
    navigate("/auth/create-assignments");
  };

  return (
    <section className="flex flex-col md:flex-row items-center justify-center p-4 sm:p-8 md:p-12 lg:p-20 gap-6 sm:gap-8 bg-transparent max-w-screen-xl mx-auto">
      <div className="w-full md:w-1/2 mb-6 md:mb-0">
        <img
          src="https://i.postimg.cc/0NKjPkhH/0f770ed96ae280e123c40e90be24a604.jpg"
          alt="Crate with vegetables"
          className="rounded-lg shadow-lg w-full h-auto object-cover"
        />
      </div>
      <div className="w-full md:w-1/2 pl-4 sm:pl-4 md:pl-8 lg:pl-12">
        <motion.h2
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4"
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          whileHover="hover"
        >
          Make learning simple and fun
        </motion.h2>
        <motion.p
          className="text-sm sm:text-base md:text-lg mb-6"
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          transition={{ delay: 0.2 }}
          whileHover="hover"
        >
          Tools for collaboration, assignments, and peer feedback
        </motion.p>
        <motion.ul
          className="space-y-2 mb-6"
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          transition={{ delay: 0.4 }}
        >
          {items.map((item, i) => (
            <motion.li
              key={i}
              className="text-sm sm:text-base md:text-base"
              variants={textVariants}
              whileHover="hover"
              transition={{ delay: 0.4 + i * 0.1 }}
            >
              {item}
            </motion.li>
          ))}
        </motion.ul>
        <motion.button
          className="btn btn-primary text-sm sm:text-base px-4 py-2"
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          whileHover="hover"
          transition={{ delay: 0.8 }}
          onClick={handleJoinUsClick}
        >
          Create Assignment
        </motion.button>
      </div>
    </section>
  );
};

export default Benifit;