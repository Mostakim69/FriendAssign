import React from 'react';

const Faq = () => {
    return (
        <div className="mx-4 sm:mx-6 md:mx-10 lg:mx-20 py-6 sm:py-8 md:py-10">
            <div className="collapse collapse-arrow bg-base-100 border border-base-300 mb-4">
                <input type="radio" name="my-accordion-2" defaultChecked />
                <div className="collapse-title text-base sm:text-lg md:text-xl font-semibold">Q: How do I create an account?</div>
                <div className="collapse-content text-xs sm:text-sm md:text-base">A: Click the "Sign Up" button in the top right corner and follow the registration process.</div>
            </div>
            <div className="collapse collapse-arrow bg-base-100 border border-base-300 mb-4">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-base sm:text-lg md:text-xl font-semibold">Q: I forgot my password. What should I do?</div>
                <div className="collapse-content text-xs sm:text-sm md:text-base">A: Click on "Forgot Password" on the login page and follow the instructions sent to your email.</div>
            </div>
            <div className="collapse collapse-arrow bg-base-100 border border-base-300 mb-4">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-base sm:text-lg md:text-xl font-semibold">Q: How can I create a group?</div>
                <div className="collapse-content text-xs sm:text-sm md:text-base">A: You can create a group by clicking the "Create Group" button and filling in the group details.<br /> After that, just submit and your group will be live.</div>
            </div>
            <div className="collapse collapse-arrow bg-base-100 border border-base-300 mb-4">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-base sm:text-lg md:text-xl font-semibold">Q: Can I update the group? If yes, how can I do it?</div>
                <div className="collapse-content text-xs sm:text-sm md:text-base">A: Yes, you can update the group if you have the right permissions. To do this, go to the group settings or<br /> management section. From there, you can edit the group details like name, description, or members.</div>
            </div>
            <div className="collapse collapse-arrow bg-base-100 border border-base-300 mb-4">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-base sm:text-lg md:text-xl font-semibold">Q: How can I increase members in my group?</div>
                <div className="collapse-content text-xs sm:text-sm md:text-base">A: To increase members, invite your friends and share the group on social media. Post interesting content<br /> regularly to keep people engaged. Also, organize events or activities that attract new members to join.</div>
            </div>
        </div>
    );
};

export default Faq;