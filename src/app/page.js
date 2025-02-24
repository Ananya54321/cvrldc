import React from "react";
import Hero from "@/components/pages/home/hero.jsx";
import Announcements from "@/components/pages/home/announcements.jsx";
import UpcomingEvents from "@/components/pages/home/upcoming-events.jsx";
import Achievements from "@/components/pages/home/achievements.jsx";
import WhyJoin from "@/components/pages/home/whyldc";
import Faculty from "@/components/pages/home/faculty";
const Page = () => {
  return (
    <>
      <Hero />

      <Announcements />

      {/* Upcoming Events Section */}
      <UpcomingEvents />

      {/* Achievements Section */}
      <Achievements />
      {/* Why Join LDC Section */}
      <WhyJoin />
      {/* Contact Section */}
      <Faculty />
      <footer className="bg-secondary text-primary py-6 text-center">
        <div className="max-w-4xl mx-auto">
          <p>
            Email:{" "}
            <a
              href="mailto:ldc.cvr@gmail.com"
              className="text-accent hover:underline">
              ldc.cvr@gmail.com
            </a>
          </p>
          <p>© 2025 CVR Literary and Debate Club. All rights reserved.</p>
          <div className="flex justify-center space-x-4 text-sm">
            <a href="#" className="hover:text-black hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-black hover:underline">
              Terms of Service
            </a>
            <a href="#" className="hover:text-black hover:underline">
              Cookie Policy
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Page;
