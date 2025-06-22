"use client";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";

const page = () => {
  const { gameName } = useParams();
  const searchParams = useSearchParams();
  const url = searchParams.get("url") || "";
  return (
    <iframe
      src={`${decodeURIComponent(url)}`}
      className="w-full h-screen p-[80px] "
      title="Legacy of Dead Game"
      style={{ border: "none" }}
    />
  );
};

export default page;
