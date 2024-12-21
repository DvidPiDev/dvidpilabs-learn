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
import { redirect } from 'next/navigation'
import {Poppins} from "next/font/google";

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

export default function create() {
  const [inputValue, setInputValue] = useState('')
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  async function handleSubmit() {
    const data = await fetch(`http://localhost:3000/api/create`, {
      method: "POST",
      body: `{"topic":"${inputValue}"}`
    });
    const gameData = await data.json()
    redirect(`http://localhost:3000/play/` + gameData.code);
  }
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
          <Button className={"bg-cornflower-500 hover:bg-cornflower-400"} onClick={handleSubmit}>Create</Button>
        </CardFooter>
      </Card>
    </div>
  )
}