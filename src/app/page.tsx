import { GameCards, RenderGameCards } from "@/components/game-cards";
import Header from "@/components/header";
import StakeRacesHero from "@/components/promotion";

export default function Home() {
  return (
    <>
      {/* Hero Section - Full width with horizontal scroll */}
      <div className="mt-16 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <StakeRacesHero />
        </div>
      </div>

      {/* Games Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <RenderGameCards />
      </div>
    </>
  );
}
