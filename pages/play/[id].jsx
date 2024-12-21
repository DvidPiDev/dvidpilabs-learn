"use client";

import { useRouter } from 'next/router'
import Image from 'next/image'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {Poppins} from "next/font/google";
export const poppins = Poppins({ weight: "400", subsets: ['latin'] });
const username = "Player258934"; // TODO: add actual API fetching
const lobby = [
  {"name": "Player258934", "id": 0, "img": 4},
  {"name": "Player258934", "id": 1, "img": 1},
  {"name": "Player258934", "id": 2, "img": 4},
  {"name": "Player258934", "id": 3, "img": 2},
  {"name": "Player258934", "id": 4, "img": 3},
  {"name": "Player258934", "id": 5, "img": 1},
  {"name": "Player258934", "id": 6, "img": 4},
  {"name": "Player258934", "id": 7, "img": 3},
  {"name": "Player258934", "id": 8, "img": 3},
  {"name": "Player258934", "id": 9, "img": 1},
  {"name": "Player258934", "id": 10, "img": 2},
  {"name": "Player258934", "id": 11, "img": 2},
  {"name": "Player258934", "id": 12, "img": 4},
  {"name": "Player258934", "id": 13, "img": 1},
  {"name": "Player258934", "id": 14, "img": 4},
]
//{ id }
export default function gamePlay() {
  //const router = useRouter()
  //const id = router.query['id'];
  return (
    <div className={"flex w-screen h-screen place-items-center justify-center " + poppins.className}>
      <Card className={"w-fit h-fit m-2"}>
        <CardHeader>
          <CardTitle>
            <p>Waiting for players...</p>
          </CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className={"max-w-[420px] flex flex-row flex-wrap gap-2"}>
          {lobby.map((l) => (
            <div
              key={l.id}
              className={"bg-cornflower-200 w-fit h-fit p-2 rounded-md text-black flex flex-row place-items-center"}>
              <Image src={`/api/img?id=${l.img}`} alt="Placeholder" width={32} height={32} className={"rounded-md mr-4"}/>
              <p>{l.name}</p>
            </div>
          ))}
        </CardContent>
        <CardFooter className={"flex flex-row"}>
          <div className={"flex flex-row place-items-center"}>
            <Image src="/256.png" alt="Placeholder" width={64} height={64} className={"rounded-2xl mr-4"}/>
            <div className={"flex flex-col"}>
              <p>You are <span className={"text-cornflower-400"}>{username}</span></p>
              <p className={"text-red-400"}>Disconnect</p>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}