"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const GameCards = ({ gameId }: { gameId: string }) => {
  const router = useRouter();

  async function startGameSession(gameId: string) {
    const userId = JSON.parse(
      localStorage.getItem("userData") || "{}"
    )?.user_id;
    if (!userId) {
      console.error("User ID not found in localStorage");
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/session`,
        {
          game: gameId,
          currency: "TRY",
          locale: "en",
          urls: {
            deposit_url: "https://test.com/deposit",
            // return url was not valid for api from localhost soo I do not know if it will work after hosting if i modify to APP_URL or something else so i am gonna leave it like this
            return_url: `https://dev.local:3000`,
          },
          userId,
        }
      );
      if (response.data && response.data.url) {
        router.push(
          `/games/${gameId}?url=${encodeURIComponent(response.data.url)}`
        );
      }
    } catch (error) {
      console.error("Error starting game session:", error);
    }
  }

  return (
    <div
      className="w-[100%] sm:w-[160px] h-[100px] sm:h-[120px] cursor-pointer bg-cover bg-center bg-no-repeat rounded-[12px] transform transition-transform duration-300 ease-in-out hover:-translate-y-4"
      style={{
        backgroundImage: `url(https://thumb.all-ingame.com/iv3/${gameId}.png)`,
      }}
      onClick={() => startGameSession(gameId)}
    ></div>
  );
};

export const RenderGameCards = ({ searchTerm }: { searchTerm: string }) => {
  const [gameList, setGameList] = useState<any[]>([]);
  const [filteredGames, setFilteredGames] = useState<any[]>([]);

  async function fetchGamesList() {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/games`,
        // Since I do not know after hosting if i still use ngrok i am gonna leave those headers there
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
            "Content-Type": "application/json",
          },
        }
      );
      setGameList(response.data);
      console.log("Fetched games list:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching game details:", error);
      return null;
    }
  }

  useEffect(() => {
    fetchGamesList();
  }, []);

  // Games Filter Logic for searchbar
  useEffect(() => {
    if (!searchTerm?.trim()) {
      setFilteredGames(gameList);
    } else {
      const filtered = gameList.filter((game) =>
        game.title?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredGames(filtered);
    }
  }, [searchTerm, gameList]);

  return (
    <div className="flex flex-wrap gap-4 w-full">
      {filteredGames.length > 0 ? (
        filteredGames.map((game) => (
          <GameCards key={game.id} gameId={game.id} />
        ))
      ) : (
        <div className="w-full text-center py-8">
          <p className="text-slate-400 text-lg">
            {searchTerm
              ? "No games found matching your search."
              : "Loading games..."}
          </p>
        </div>
      )}
    </div>
  );
};
