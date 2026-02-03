import { useState } from "react";
import AccordionItem from "../../../components/AccordionItem/AccordionItem";
import InnerBanner from "../../../components/InnerBanner/InnerBanner";
import ReviewSection from "../../../components/Review/ReviewSection";
import SubHeader from "../../../components/SubHeader/SubHeader";
import "./Faq.scss";
const Faq = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    return (
        <>
            <InnerBanner />
            <section className="common-gap">
                <div className="container">
                    <div className="text-center">
                        <SubHeader title="Frequently Asked Questions (FAQs)" desc="Got questions? We’ve got answers. Explore common queries to help you create and manage your personal videos with ease." />
                    </div>
                    <div className="accordion">
                        <AccordionItem
                            title="What is a personal video?"
                            isOpen={openIndex === 0}
                            onToggle={() =>
                                setOpenIndex(openIndex === 0 ? null : 0)
                            }
                        >    
                        <p>A personal video is a fully customized video created using your own story, photos, videos, voice recordings, and personal preferences. It allows you to bring your memories to life by combining meaningful moments with visuals, music, and storytelling elements.</p>
                        <p>Whether you’re capturing life milestones, sharing personal experiences, or creating content for family and friends, personal videos help you preserve memories in a lasting, visually engaging format that can be easily viewed, shared, and cherished over time.</p>
                        </AccordionItem>
                        <AccordionItem
                            title="How do I create a personal video?"
                            isOpen={openIndex === 1}
                            onToggle={() =>
                                setOpenIndex(openIndex === 1 ? null : 1)
                            }
                        >
                        <p>A personal video is a fully customized video created using your own story, photos, videos, voice recordings, and personal preferences. It allows you to bring your memories to life by combining meaningful moments with visuals, music, and storytelling elements.</p>
                        <p>Whether you’re capturing life milestones, sharing personal experiences, or creating content for family and friends, personal videos help you preserve memories in a lasting, visually engaging format that can be easily viewed, shared, and cherished over time.</p>
                        </AccordionItem>
                        <AccordionItem
                            title="Can I save my work and continue later?"
                            isOpen={openIndex === 2}
                            onToggle={() =>
                                setOpenIndex(openIndex === 2 ? null : 2)
                            }
                        >
                        <p>A personal video is a fully customized video created using your own story, photos, videos, voice recordings, and personal preferences. It allows you to bring your memories to life by combining meaningful moments with visuals, music, and storytelling elements.</p>
                        <p>Whether you’re capturing life milestones, sharing personal experiences, or creating content for family and friends, personal videos help you preserve memories in a lasting, visually engaging format that can be easily viewed, shared, and cherished over time.</p>
                        </AccordionItem>

                        <AccordionItem
                            title="What types of files can I upload?"
                            isOpen={openIndex === 3}
                            onToggle={() =>
                                setOpenIndex(openIndex === 3 ? null : 3)
                            }
                        >
                        <p>A personal video is a fully customized video created using your own story, photos, videos, voice recordings, and personal preferences. It allows you to bring your memories to life by combining meaningful moments with visuals, music, and storytelling elements.</p>
                        <p>Whether you’re capturing life milestones, sharing personal experiences, or creating content for family and friends, personal videos help you preserve memories in a lasting, visually engaging format that can be easily viewed, shared, and cherished over time.</p>
                        </AccordionItem>
                        <AccordionItem
                            title="How long does it take to generate a video?"
                            isOpen={openIndex === 4}
                            onToggle={() =>
                                setOpenIndex(openIndex === 4 ? null : 4)
                            }
                        >
                        <p>A personal video is a fully customized video created using your own story, photos, videos, voice recordings, and personal preferences. It allows you to bring your memories to life by combining meaningful moments with visuals, music, and storytelling elements.</p>
                        <p>Whether you’re capturing life milestones, sharing personal experiences, or creating content for family and friends, personal videos help you preserve memories in a lasting, visually engaging format that can be easily viewed, shared, and cherished over time.</p>
                        </AccordionItem>
                        <AccordionItem
                            title="Can I edit my video after it’s generated?"
                            isOpen={openIndex === 5}
                            onToggle={() =>
                                setOpenIndex(openIndex === 5 ? null : 5)
                            }
                        >
                        <p>A personal video is a fully customized video created using your own story, photos, videos, voice recordings, and personal preferences. It allows you to bring your memories to life by combining meaningful moments with visuals, music, and storytelling elements.</p>
                        <p>Whether you’re capturing life milestones, sharing personal experiences, or creating content for family and friends, personal videos help you preserve memories in a lasting, visually engaging format that can be easily viewed, shared, and cherished over time.</p>
                        </AccordionItem>
                        <AccordionItem
                            title="Is my content private and secure?"
                            isOpen={openIndex === 6}
                            onToggle={() =>
                                setOpenIndex(openIndex === 6 ? null : 6)
                            }
                        >
                        <p>A personal video is a fully customized video created using your own story, photos, videos, voice recordings, and personal preferences. It allows you to bring your memories to life by combining meaningful moments with visuals, music, and storytelling elements.</p>
                        <p>Whether you’re capturing life milestones, sharing personal experiences, or creating content for family and friends, personal videos help you preserve memories in a lasting, visually engaging format that can be easily viewed, shared, and cherished over time.</p>
                        </AccordionItem>
                        <AccordionItem
                            title="What video quality options are available?"
                            isOpen={openIndex === 7}
                            onToggle={() =>
                                setOpenIndex(openIndex === 7 ? null : 7)
                            }
                        >
                        <p>A personal video is a fully customized video created using your own story, photos, videos, voice recordings, and personal preferences. It allows you to bring your memories to life by combining meaningful moments with visuals, music, and storytelling elements.</p>
                        <p>Whether you’re capturing life milestones, sharing personal experiences, or creating content for family and friends, personal videos help you preserve memories in a lasting, visually engaging format that can be easily viewed, shared, and cherished over time.</p>
                        </AccordionItem>
                        <AccordionItem
                            title="Why is my video still processing?"
                            isOpen={openIndex === 8}
                            onToggle={() =>
                                setOpenIndex(openIndex === 8 ? null : 8)
                            }
                        >
                        <p>A personal video is a fully customized video created using your own story, photos, videos, voice recordings, and personal preferences. It allows you to bring your memories to life by combining meaningful moments with visuals, music, and storytelling elements.</p>
                        <p>Whether you’re capturing life milestones, sharing personal experiences, or creating content for family and friends, personal videos help you preserve memories in a lasting, visually engaging format that can be easily viewed, shared, and cherished over time.</p>
                        </AccordionItem>
                        <AccordionItem
                            title="How can I get additional help?"
                            isOpen={openIndex === 9}
                            onToggle={() =>
                                setOpenIndex(openIndex === 9 ? null : 9)
                            }
                        >
                        <p>A personal video is a fully customized video created using your own story, photos, videos, voice recordings, and personal preferences. It allows you to bring your memories to life by combining meaningful moments with visuals, music, and storytelling elements.</p>
                        <p>Whether you’re capturing life milestones, sharing personal experiences, or creating content for family and friends, personal videos help you preserve memories in a lasting, visually engaging format that can be easily viewed, shared, and cherished over time.</p>
                        </AccordionItem>
                    </div>
                </div>
            </section>
            <ReviewSection />
        </>
    );
};

export default Faq;
