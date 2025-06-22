"use client";
import React, { useEffect, useState } from "react";
import { Search, User, Bell, MessageSquare, ChevronDown } from "lucide-react";
import axios from "axios";

const Header = () => {
  const [isBalanceDropdownOpen, setIsBalanceDropdownOpen] = useState(false);
  const [userBalance, setUserBalance] = useState({
    usd: "$0.00",
  });

  async function fetchUserBalance() {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/me?user_id=c150a529-0c94-4bea-8d38-7a2c494f4f23`,
      {
        headers: {
          "ngrok-skip-browser-warning": "true",
          "Content-Type": "application/json",
        },
      }
    );

    const userData = response.data;
    const balance = parseFloat(userData.balance) / 100;

    // Option 1: If the balance is in USD and you want to display it as such
    setUserBalance({
      usd: `$${balance.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    });
  }
  useEffect(() => {
    fetchUserBalance();
  }, []);
  return (
    <header className="w-full bg-slate-800 border-b border-slate-700 pl-[16%] pr-[16%] shadow-lg fixed top-0 z-50">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="flex items-center">
          <div
            className="text-white text-2xl font-bold italic cursor-pointer"
            onClick={() => (window.location.href = "/")}
          >
            Stake
          </div>
        </div>

        {/* Center section - Balance and Wallet */}
        <div className="flex items-center gap-3">
          {/* Balance Display */}
          <div className="flex items-center gap-2">
            <div
              className="flex items-center gap-2 cursor-pointer hover:bg-slate-700 rounded-md px-3 py-2 transition-colors"
              onClick={() => setIsBalanceDropdownOpen(!isBalanceDropdownOpen)}
            >
              <span className="text-white text-sm font-medium">
                {userBalance.usd}
              </span>
              <div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">$</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-gray-400 transition-transform ${
                  isBalanceDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </div>

            {/* Balance Dropdown */}
            {isBalanceDropdownOpen && (
              <div className="absolute top-14 bg-slate-700 border border-slate-600 rounded-lg shadow-xl p-3 min-w-48 z-50">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">USD</span>
                    <span className="text-white">{userBalance.usd}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Wallet Button */}
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors">
            Wallet
          </button>
        </div>

        {/* Right section - Icons */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <button className="p-2 text-gray-400 hover:text-white hover:bg-slate-700 rounded-md transition-colors">
            <Search className="w-5 h-5" />
          </button>

          {/* User Profile */}
          <button className="p-2 text-gray-400 hover:text-white hover:bg-slate-700 rounded-md transition-colors">
            <User className="w-5 h-5" />
          </button>

          {/* Notifications */}
          <button className="p-2 text-gray-400 hover:text-white hover:bg-slate-700 rounded-md transition-colors relative">
            <Bell className="w-5 h-5" />
            {/* Notification dot */}
            <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></div>
          </button>

          {/* Messages/Chat */}
          <button className="p-2 text-gray-400 hover:text-white hover:bg-slate-700 rounded-md transition-colors">
            <MessageSquare className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {isBalanceDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsBalanceDropdownOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
