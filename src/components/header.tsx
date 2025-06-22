"use client";
import React, { useEffect, useState } from "react";
import { Search, User, Bell, MessageSquare, ChevronDown } from "lucide-react";
import axios from "axios";
import { io } from "socket.io-client";
import { Channels } from "@/utils/enums/channels.enum";

const Header = () => {
  const [isBalanceDropdownOpen, setIsBalanceDropdownOpen] = useState(false);
  const [userBalance, setUserBalance] = useState({
    usd: "$0.00",
  });

  // I was using /me endpoint to fetch balance but i moved to websocket updates so it will always updates data from one source, I will just leave this function still there for future reference maybe
  // async function fetchUserBalance(userId: string) {
  //   const response = await axios.get(
  //     `${process.env.NEXT_PUBLIC_API_URL}/me?user_id=${userId}`,
  //     {
  //       headers: {
  //         "ngrok-skip-browser-warning": "true",
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );

  //   const userData = response.data;
  //   const balance = parseFloat(userData.balance) / 100;

  //   // I display balance as USD, because we do not have conversion
  //   setUserBalance({
  //     usd: `$${balance.toLocaleString("en-US", {
  //       minimumFractionDigits: 2,
  //       maximumFractionDigits: 2,
  //     })}`,
  //   });
  // }

  function initializeWebSocket() {
    const socket = io(`${process.env.NEXT_PUBLIC_API_URL}`, {
      transports: ["websocket"],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      query: {
        userId: (() => {
          const userData = localStorage.getItem("userData");
          console.log("User data from localStorage:", userData);
          return userData ? JSON.parse(userData)?.user_id || "" : "";
        })(),
      },
    });
    socket.on("message", (message) => {
      console.log("WebSocket message received:", message);
    });
    socket.on("connect", () => {
      console.log("WebSocket connected");
    });

    socket.on("disconnect", () => {
      console.log("WebSocket disconnected");
    });

    socket.on(Channels.USER_DATA, (data) => {
      // Backend generates new user and i save this data because we do not have authentication implemented, for testing it should be enough
      localStorage.setItem("userData", JSON.stringify(data));
      console.log("User data received:", data);
      const balance = parseFloat(data.balance) / 100;
      setUserBalance({
        usd: `$${balance.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`,
      });
    });

    socket.on(Channels.BALANCE_UPDATE, (data) => {
      console.log("Balance update received:", data);
      const balance = parseFloat(data.balance) / 100;
      setUserBalance({
        usd: `$${balance.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`,
      });
    });
  }
  useEffect(() => {
    initializeWebSocket();
  }, []);

  return (
    <header className="w-full bg-slate-800 border-b border-slate-700 pl-[16%] pr-[16%] shadow-lg fixed top-0 z-50">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <div
            className="text-white text-2xl font-bold italic cursor-pointer"
            onClick={() => (window.location.href = "/")}
          >
            Betmavrik
          </div>
        </div>

        <div className="flex items-center gap-3">
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

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors">
            Wallet
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2 text-gray-400 hover:text-white hover:bg-slate-700 rounded-md transition-colors">
            <Search className="w-5 h-5" />
          </button>

          <button className="p-2 text-gray-400 hover:text-white hover:bg-slate-700 rounded-md transition-colors">
            <User className="w-5 h-5" />
          </button>

          <button className="p-2 text-gray-400 hover:text-white hover:bg-slate-700 rounded-md transition-colors relative">
            <Bell className="w-5 h-5" />
            <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></div>
          </button>

          <button className="p-2 text-gray-400 hover:text-white hover:bg-slate-700 rounded-md transition-colors">
            <MessageSquare className="w-5 h-5" />
          </button>
        </div>
      </div>

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
