"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Instagram, Linkedin } from "lucide-react";
import { teamMembers } from "@/constants/members";

const TeamPage = () => {
  // Group members by category
  const groupMembersByCategory = () => {
    const groups = {};
    teamMembers.forEach((member) => {
      if (!groups[member.Category]) {
        groups[member.Category] = [];
      }
      groups[member.Category].push(member);
    });
    return groups;
  };

  // Order of designations (priority order)
  const categories = [
    "Chairperson",
    "Vice Chairperson",
    "Treasurer",
    "Tech Team",
    "Documentation Team",
    "Graphic Design Team",
    "Social Media Team",
    "Logistics Team",
    "Photography Team",
    "STP Vertical",
    "Eclectics Vertical",
    "Writer's Space Vertical",
    "Shared Shelf Vertical",
    // Add other designations in desired order
  ];

  // Convert Google Drive link to direct image URL
  const getImageUrl = (driveLink) => {
    try {
      if (!driveLink) return "/default-profile.jpg"; // Add a default image path

      // Extract file ID from Google Drive link
      const fileId = driveLink.split("id=")[1];
      // Return a placeholder if no fileId
      if (!fileId) return "/default-profile.jpg";
      // Convert to direct link format
      return `https://drive.google.com/uc?export=view&id=${fileId}`;
    } catch (error) {
      console.error("Error processing image URL:", error);
      return "/default-profile.jpg";
    }
  };

  // Animation delay for each member card with staggered delay
  const getMemberDelay = (index) => {
    return `${index * 0.1}s`;
  };

  const membersGroup = groupMembersByCategory();

  return (
    <div className="min-h-screen bg-secondary py-16 px-2 sm:px-4 lg:px-8">
      {/* Hero section */}
      <div className="text-center mb-16 animate-fade-up">
        <h1 className="text-5xl md:text-7xl font-bold titlefont text-primary mb-6">
          <span className="text-highlight">Our Team</span>
        </h1>
        <p className="text-lg md:text-xl text-ternary max-w-3xl mx-auto">
          Meet the dedicated individuals who work together to make our vision a
          reality. Each member brings unique skills and passion to our
          collective mission.
        </p>
      </div>

      {/* Team members by designation */}
      <div className="max-w-7xl mx-auto">
        {categories.map((category) => {
          // Skip if no members with this category
          if (!membersGroup[category] || membersGroup[category].length === 0) {
            return null;
          }

          return (
            <div key={category} className="mb-10 w-full md:mb-20">
              <h2 className="text-3xl md:text-4xl titlefont text-primary mb-10 text-center">
                {category}
              </h2>

              <div
                className={`grid ${
                  membersGroup[category].length === 1
                    ? "mx-auto w-[50%] md:w-[30%]"
                    : "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                } gap-2 md:gap-8`}>
                {membersGroup[category].map((member, index) => (
                  <div
                    key={member.LDCID || index}
                    className="bg-primary rounded-lg shadow-lg overflow-hidden hover:translate-y-[-5px] transition-transform duration-300 w-full max-w-sm"
                    style={{ animationDelay: getMemberDelay(index) }}>
                    <div className="relative h-48 md:h-72 w-full overflow-hidden bg-primary">
                      <Image
                        src={getImageUrl(member.photo)}
                        alt={member.Name || "Team Member"}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                        onError={(e) => {
                          e.target.src = "/cvrldclogo.svg";
                        }}
                      />
                    </div>

                    <div className="p-6">
                      <h3 className="text-base md:text-xl font-semibold text-accent mb-1">
                        {member.Name || "Team Member"}
                      </h3>
                      <p className="text-xs md:text-sm text-secondary font-medium mb-2">
                        {member.Designation}
                      </p>
                      <p className="text-xs text-accent mb-4">
                        {member.LDCID || ""}
                      </p>

                      <div className="flex space-x-4 md:mt-4">
                        {member.Instagram && (
                          <Link
                            href={member.Instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-ternary rounded-full text-white hover:bg-slate-900  transition-colors">
                            <Instagram size={20} />
                          </Link>
                        )}
                        {member.LinkedIn && (
                          <Link
                            href={member.LinkedIn}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-ternary rounded-full text-white hover:bg-slate-900  transition-colors">
                            <Linkedin size={20} />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TeamPage;
