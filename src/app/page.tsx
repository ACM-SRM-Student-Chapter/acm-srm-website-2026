import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Domains from "@/components/sections/Domains";
import EventsTimeline from "@/components/sections/EventsTimeline";
import TeamSection from "@/components/sections/CommunityPartners";

export default function Home() {
  return (
    <div className="flex flex-col pb-20">
      <Hero />

      {/* Content wrapper */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 space-y-24">
        <Stats />
        <Domains />
        <EventsTimeline />
        <TeamSection />
      </div>
    </div>
  );
}
