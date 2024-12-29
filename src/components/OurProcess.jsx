"use client";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useState } from "react";

// Helper function to limit words
const truncateText = (text, wordLimit) => {
  const words = text.split(" ");
  if (words.length <= wordLimit) return text;
  return words.slice(0, wordLimit).join(" ") + "...";
};

const OurProcess = () => {
  const [isMobile, setIsMobile] = useState(false); // Track if it's mobile view
  const [expandedIndex, setExpandedIndex] = useState(null); // State to manage expanded steps

  // Detect mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Check initial window size
    window.addEventListener("resize", handleResize); // Listen to window resize

    return () => window.removeEventListener("resize", handleResize); // Cleanup
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // GSAP animation logic for all elements with the 'animate-box' class
    gsap.utils.toArray(".animate-box").forEach((box) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: box,
          start: "top 35%",
          end: "top 15%",
          scrub: true,
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        box,
        {
          opacity: 0,
          y: 150,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
        }
      );

      box.addEventListener("mouseenter", () => {
        gsap.to(box, {
          borderColor: "#60ea00",
          boxShadow: "0px 15px 25px rgba(0, 0, 0, 0.4)",
          duration: 0.4,
          ease: "power2.out",
        });
      });

      box.addEventListener("mouseleave", () => {
        gsap.to(box, {
          borderColor: "transparent",
          boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
          duration: 0.4,
          ease: "power2.in",
        });
      });
    });
  }, []);

  // Content for each process box
  const steps = [
    {
      title: "Discovery",
      content:
        "In the problem-solving process, the most important part is the correct identification of the actual problem and then thinking about a solution. Your solution will only be effective if you have the correct sense about the problem. Similarly, at DevZyte our core value is to first identify or discover what your problem is, where you lack or what you need the most. Then it is our responsibility to plan and develop such a solution that will suit you the best. We analyze what you are, what you want, and what can be done to improve your position in your respective industry. Our major goal is to discover how our Web development, App development, AI, Machine learning, and marketing services can help you excel in your market. We first analyze your industry, your competition, and then we think about how you can have an edge over others.",
    },
    {
      title: "Planning and Design",
      content:
        "If you are related to the field of information technology, software development or even programming then you would be surely aware about the importance of this planning and designing phase. Also there is a famous saying among programmers that: “first solve the problem, then write the code.” Actual solution of a problem is done in this phase because if you have planned a solution appropriately then you can easily implement it without any problem. That’s why our planning and designing team consist of experienced professionals and experts who know what your needs are, what are the constraints and what your competitors have so keeping everything in mind they try to design an efficient solution that will be best value to money as well as most efficient with respect to the constraints and other things. After this the design is passed to the development team.",
    },
    {
      title: "Development",
      content:
        "After discovery and planning, there comes the development phase. This is the point where all your creative ideas turn into reality. Here our team of skilled developers develop an efficient and advanced solution according to the design. During this development phase only one thing is kept in mind which is the desires of our customer. Whether it is web development, machine learning, app development or AI development, we try our best to meet the expectations of the clients completely. The best thing about our development team is that they deal with every project as a real-time scenario. Which is the reason behind our slogan 'Turning visions into reality'. That is why most of our clients are satisfied from us because they exactly got what they imagined.",
    },
    {
      title: "Testing and Quality Assurance",
      content:
        "After all the hard work, there comes the testing phase where our team of skilled testers and quality assurance officers check for the quality and efficiency of the solution by passing it through a number of test cases and maximum possible real-time scenarios which it might face in the industry. That’s how the quality of our solutions is maintained and our clients get the most refined form of solutions. That's why they don’t seem to face any problems or issues with the solutions we have designed for them. At DevZyte it is our basic core that we won’t let our valuable clients down because of us.",
    },
  ];

  // Function to toggle content expansion on mobile
  const toggleExpand = (index) => {
    if (isMobile) {
      setExpandedIndex(expandedIndex === index ? null : index);
    }
  };

  return (
    <div className="max-w-[1320px] mx-auto md:mb-[200px] space-y-14 px-4 md:px-10">
      {steps.map((step, index) => {
        const isExpanded = expandedIndex === index;
        const shouldTruncate = isMobile && step.content.split(" ").length > 150;

        return (
          <div
            key={index}
            className="animate-box  rounded-lg shadow-lg p-8 md:p-16 space-y-6 transition-all duration-300 ease-out"
            style={{ borderWidth: 3, borderColor: "transparent" }}
          >
            <h1 className="text-[25px] md:text-[48px] font-bold">{step.title}</h1>
            <p className="text-lg md:text-xl leading-relaxed">
              {shouldTruncate && !isExpanded
                ? truncateText(step.content, 150)
                : step.content}
            </p>
            {shouldTruncate && (
              <button
                onClick={() => toggleExpand(index)}
                className="text-[#60ea00] font-semibold"
              >
                {isExpanded ? "Show Less" : "Read More"}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default OurProcess;
