import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Brain, Mic, Users, Trophy, Star } from "lucide-react";

const iconMap = {
  brain: <Brain size={48} className="text-accent" />,
  mic: <Mic size={48} className="text-accent" />,
  users: <Users size={48} className="text-accent" />,
  trophy: <Trophy size={48} className="text-accent" />,
  star: <Star size={48} className="text-accent" />,
};

const WhyJoinBento = () => {
  const benefits = [
    {
      id: 1,
      title: "Intellectual Growth",
      description:
        "Develop critical thinking and analytical skills through structured debate",
      icon: "brain",
    },
    {
      id: 2,
      title: "Public Speaking",
      description: "Master the art of eloquent and persuasive communication",
      icon: "mic",
    },
    {
      id: 3,
      title: "Community",
      description:
        "Join a vibrant community of passionate debaters and lifelong learners",
      icon: "users",
    },
    {
      id: 4,
      title: "Competition Success",
      description:
        "Participate in tournaments and showcase your debating prowess on regional and national stages",
      icon: "trophy",
    },
    {
      id: 5,
      title: "Leadership Development",
      description:
        "Take on leadership roles and help shape the future of the club",
      icon: "star",
    },
  ];

  return (
    <section className="bg-primary text-secondary py-20 px-6" id="benefits">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-5xl titlefont font-bold mb-12 tracking-wide">
          Why Join <span className="text-accent">LDC?</span>
        </h2>

        <BentoGrid className="max-w-6xl  mx-auto">
          {benefits.map((item, i) => (
            <BentoGridItem
              key={item.id}
              title={<span className="text-accent text-2xl">{item.title}</span>}
              description={
                <span className="text-secondary text-xl">
                  {item.description}
                </span>
              }
              header={
                <div className="flex items-center text-white justify-center w-full h-full min-h-[6rem]  backdrop-blur-md rounded-xl">
                  {iconMap[item.icon]}
                </div>
              }
              className={
                i === 3
                  ? "md:col-span-2 bg-secondary/5  text-white border border-secondary/30"
                  : "bg-secondary/5 text-white border border-secondary/30"
              }
            />
          ))}
        </BentoGrid>

        <div className="mt-16 max-w-3xl mx-auto text-center">
          <blockquote className="text-xl italic border-l-4 border-accent pl-6 py-4">
            "Debate is about the clash of ideas, not people. It is through this
            clash that we refine our thinking and discover truth."
          </blockquote>
          <p className="mt-4 text-lg">— Dr. Elizabeth Thornton, Club Advisor</p>
        </div>
      </div>
    </section>
  );
};

export default WhyJoinBento;
