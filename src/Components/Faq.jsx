import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos"; // Ensure AOS is imported
import "aos/dist/aos.css"; // Import AOS styles

AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
});

const FAQs = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (index) => {
        console.log("Toggling index:", index, "Current openIndex:", openIndex); // Debugging
        setOpenIndex(openIndex === index ? null : index);
    };

    const contentVariants = {
        hidden: { height: 0, opacity: 0, overflow: "hidden" },
        visible: { height: "fit-content", opacity: 1, overflow: "hidden" },
        exit: { height: 0, opacity: 0, overflow: "hidden" },
    };

    const faqs = [
        {
            question: " Q: How do I create an account?",
            answer:
                "A: Click the 'Sign Up' button in the top right corner and follow the registration process.",
        },
        {
            question: "Q: I forgot my password. What should I do?",
            answer:
                "A: Click on 'Forgot Password' on the login page and follow the instructions sent to your email.",
        },
        {
            question: " Q: How can I create a group?",
            answer:
                "A: You can create a group by clicking the 'Create Group' button and filling in the group details. After that, just submit and your group will be live.",
        },
        {
            question: " Q: Can I update the group? If yes, how can I do it?",
            answer:
                "A: Yes, you can update the group if you have the right permissions. To do this, go to the group settings or management section. From there, you can edit the group details like name, description, or members.",
        },
        {
            question: " Q: How can I increase members in my group?",
            answer:
                "A: To increase members, invite your friends and share the group on social media. Post interesting content regularly to keep people engaged. Also, organize events or activities that attract new members to join.",
        },
    ];

    return (
        <section
            className="max-w-5xl mx-auto px-4 py-20 space-y-12 overflow-hidden"
            data-aos="fade-in"
        >
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-14 bg-clip-text drop-shadow-xl animate-pulse">
                Frequently Asked Questions
            </h2>

            <div className="space-y-5">
                {faqs.map((faq, idx) => (
                    <div
                        key={idx}
                        className="border border-primary bg-gradient-to-br from-[#0f172a] to-[#1e293b] rounded-lg overflow-hidden shadow-lg hover:shadow-pink-500/30 transition-all duration-300"
                        data-aos="fade-down-left"
                        data-aos-delay={idx * 200} // Increased delay for visibility
                    >
                        <button
                            onClick={() => toggle(idx)}
                            className="w-full flex justify-between items-center cursor-pointer px-6 py-4 text-left hover:bg-[#1f2937] transition-colors duration-300 group"
                        >
                            <span className="text-lg md:text-xl font-semibold text-white group-hover:text-primary transition-colors">
                                {faq.question}
                            </span>
                            <motion.span
                                animate={{ rotate: openIndex === idx ? 180 : 0 }}
                                transition={{ duration: 0.5 }} // Increased duration
                                className="text-primary text-2xl"
                            >
                                ▾
                            </motion.span>
                        </button>

                        <AnimatePresence>
                            {openIndex === idx && (
                                <motion.div
                                    key={`content-${idx}`}
                                    variants={contentVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    layout // Added for smooth height transitions
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    className="px-6 pb-5 text-sm md:text-base text-gray-300 leading-relaxed"
                                >
                                    <p className="border-l-4 border-primary pl-4">
                                        {faq.answer}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FAQs;