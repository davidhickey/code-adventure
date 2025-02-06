"use client";
import { useEffect } from "react";

const Ignatius = () => {
  const getHaiku = async () => {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: "Who will win the Premier League?" }),
    });
    const data = await res.json();
    console.log('chatgpt data ', data);
    
  }

  useEffect(() => {
    getHaiku();
  }, []);





  return <h1>Ignatius</h1>;
}

export default Ignatius;