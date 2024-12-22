"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Poppins } from "next/font/google";
import { useRouter } from 'next/router';

export const poppins = Poppins({ weight: "400", subsets: ['latin'] });

function pickRandom() {
  const topics = [
    "Wildlife animals",
    "Human anatomy",
    "World economy",
    "Cartoon characters",
    "Superheroes",
    "Present perfect"
  ];
  let randomItem = Math.floor(Math.random()*topics.length);
  return topics[randomItem];
}

export default function Create({ socket }) {
  const router = useRouter();
  const [gameCode, setGameCode] = useState(null);
  const [error, setError] = useState('');
  const [inputValue, setInputValue] = useState('')
  const handleChange = (event) => {setInputValue(event.target.value);};

  const createGame = async () => {
    try {
      const res = await fetch('/api/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: `{"topic":"${inputValue}"}`,
      });
      const data = await res.json();
      setGameCode(data.code);

      if (socket) {
        socket.emit('create-game', { code: data.code });
      }

      setTimeout(() => {
        router.push(`/status?code=${data.code}`);
      }, 500);
    } catch (error) {
      setError('failed to create game');
    }
  };

  return (
    <div className={"flex place-items-center justify-center h-screen w-screen " + poppins.className}>
      <Card className={"w-96 h-fit border-none text-black"}>
        <CardHeader>
          <CardTitle>Create a game</CardTitle>
          <CardDescription className={"text-cornflower-400"}>Teacher+ mode</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor={"topic"}>Topic</Label>
            <Input value={inputValue} onChange={handleChange} suppressHydrationWarning={true} className={""} type={"text"} id={"topic"} placeholder={pickRandom()}/>
          </div>
        </CardContent>
        <CardFooter className={"flex justify-end"}>
          <Button className={"bg-cornflower-500 hover:bg-cornflower-400"} onClick={createGame}>Create</Button>
        </CardFooter>
      </Card>
    </div>
  )
}