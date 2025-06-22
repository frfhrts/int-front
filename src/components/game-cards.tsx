"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const GameCards = ({ gameId }: { gameId: string }) => {
  const router = useRouter();
  async function startGameSession(gameId: string) {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/session`,
        {
          game: gameId,
          currency: "TRY",
          locale: "en",
          ip: "91.158.1.1",
          client_type: "mobile",
          urls: {
            deposit_url: "https://test.com/deposit",
            return_url: `https://dev.local:3000`,
          },
          user: {
            user_id: "c150a529-0c94-4bea-8d38-7a2c494f4f23",
            firstname: "TEST_FN",
            lastname: "TEST_LN",
            nickname: "TEST",
            city: "FRANKFURT",
            date_of_birth: "1992-08-11",
            registered_at: "2022-08-11",
            gender: "m",
            country: "DE",
          },
          rtp: 90,
        }
      );
      if (response.data && response.data.url) {
        router.push(
          `/games/${gameId}?url=${encodeURIComponent(response.data.url)}`
        );
        // openGameInNewWindow(response.data.url);
      }
    } catch (error) {
      console.error("Error starting game session:", error);
    }
  }

  function openGameInNewWindow(gameUrl: string) {
    // Create HTML content for the new window with iframe
    // const htmlContent = `
    //   <!DOCTYPE html>
    //   <html lang="en">
    //   <head>
    //     <meta charset="UTF-8">
    //     <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //     <title>Game Session</title>
    //     <style>
    //       body {
    //         margin: 0;
    //         padding: 0;
    //         overflow: hidden;
    //         background-color: #000;
    //       }
    //       iframe {
    //         width: 100vw;
    //         height: 100vh;
    //         border: none;
    //       }
    //     </style>
    //   </head>
    //   <body>
    //     <iframe src="${gameUrl}" allowfullscreen></iframe>
    //   </body>
    //   </html>
    // `;
    // // Open new window and write the HTML content
    // const newWindow = window.open(
    //   "",
    //   "_blank",
    //   "width=1200,height=800,scrollbars=yes,resizable=yes"
    // );
    // if (newWindow) {
    //   newWindow.document.write(htmlContent);
    //   newWindow.document.close();
    // } else {
    //   // Fallback: direct navigation if popup is blocked
    //   window.open(gameUrl, "_blank");
    // }
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

export const RenderGameCards = () => {
  const [gameList, setGameList] = useState<any[]>([]);

  async function fetchGamesList() {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/games`,
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

  return (
    <div className="flex flex-wrap gap-4 w-full">
      {gameList.length > 0 &&
        gameList.map((game) => <GameCards key={game.id} gameId={game.id} />)}
    </div>
  );
};
