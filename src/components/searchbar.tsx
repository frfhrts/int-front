"use client";
import { Search } from "lucide-react";
import { useState } from "react";

export default function SearchBar({ searchTerm, onSearchChange }: any) {
  return (
    <div className="relative h-12 max-w-6xl mx-auto mt-8">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-slate-400" />
      </div>
      <input
        type="text"
        placeholder="Search your game"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-12 pr-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-colors"
      />
    </div>
  );
}
