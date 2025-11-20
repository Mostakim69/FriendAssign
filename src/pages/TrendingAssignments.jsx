import { motion } from "framer-motion";

const trendinggroup = [
  {
    name: "📚 Book Review Assignment",
    image: "https://i.postimg.cc/sDxHXswY/fb16509054af86d39aeaa093f59f2ec9.jpg",
    description:
      "Read a chosen book and share your thoughts. Highlight key lessons, themes, and your personal opinion."
  },
  {
    name: "🖼️ Creative Poster Design",
    image: "https://i.postimg.cc/0NRVcmxn/c8a4f550e47a8d492698cd43193dc19f.jpg",
    description:
      "Create an eye-catching poster on a given topic. Use your creativity to make it informative and visually appealing.",
  },
  {
    name: "💻 Web Development Task",
    image: "https://i.postimg.cc/RhsPRDVJ/9d676e1e3e5a0380b6616cca724c5206.jpg",
    description:
      "Build a simple webpage using HTML, CSS, and JavaScript. Focus on clean design and user-friendly layout.",
  },
  {
    name: "📊 Data Analysis Report",
    image: "https://i.postimg.cc/B63wQFVb/30ff15e14daaaf1165cca1c21a86199e.jpg",
    description:
      "Prepare a 5-minute presentation on an assigned topic. Practice clarity, confidence, and audience engagement.",
  },
];

const TrendingAssignments = () => {
  return (
    <section className=" py-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-extrabold text-center mb-4  bg-clip-text drop-shadow-xl animate-pulse"
        >
          🔥 Trending Assignments
        </motion.h2>
        <p className="text-lg mb-8 max-w-xl mx-auto">
          Discover the most loved destinations by our travelers this week.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {trendinggroup.map((group, i) => (
            <div key={group.name} data-aos="flip-left">
              <motion.div
                
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="relative overflow-hidden group rounded-2xl border border-sky-700 bg-white shadow-[0_0_30px_#0ea5e944] hover:shadow-[0_0_40px_#38bdf8aa] transition-all duration-300"
              >
                <img
                  src={group.image}
                  alt={group.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 group-hover:bg-black/10 transition-all duration-300" />
                <div className="absolute top-3 left-3 bg-primary px-3 py-1 text-xs rounded-full font-semibold shadow shadow-cyan-800">
                  🚀 New Assign
                </div>
                <div className="relative z-10 p-4 ">
                  <h3 className="text-lg font-bold text-primary">
                    {group.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {group.description}
                  </p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingAssignments;