"use client";
import { RenderGameCards } from "@/components/game-cards";
import StakeRacesHero from "@/components/promotion";
import SearchBar from "@/components/searchbar";
import { useState } from "react";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      {/* News And Promotions Section */}
      <div className="mt-16 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <StakeRacesHero />
        </div>
      </div>

      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {/* Games Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <RenderGameCards searchTerm={searchTerm} />
      </div>
    </>
  );
}
