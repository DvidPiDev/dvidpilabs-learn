import Image from "next/image";
import { Button } from "@/components/ui/button"
import Link from 'next/link'

import {Poppins, Instrument_Sans } from "next/font/google";

export const poppins = Poppins({ weight: "400", subsets: ['latin'] });
export const instrumentSans = Instrument_Sans({ weight: ["700", "400"], subsets: ['latin'] })

export default function Home() {
  return (
    <div className={"relative flex flex-col " + poppins.className}>
      <div className={`text-center mt-32 mx-3`}>
        <p className={`${instrumentSans.className} font-bold text-3xl`}>DvidPiLabs <span className={`font-medium text-cornflower-400`}>learn</span>.</p>
        <p className={`text-3xl md:text-6xl mt-2`}>Helping teachers with <span className={"text-cornflower-400"}>artificial intelligence</span>, one by one.</p>
      </div>
      <div className={"fixed bottom-32 flex flex-col place-items-center w-screen"}>
        <Button className={"bg-blue-500 hover:bg-blue-400 w-fit text-cornflower-50"}>
          <Link href={"/play"}>Join a game</Link>
        </Button>
        <Image src={"/divider.svg"} alt={"Divider"} className={"my-4"} width={250} height={100} />
        <Button asChild className={"bg-blue-500 hover:bg-blue-400 w-fit text-cornflower-50"}>
          <Link href={"/create"}>Create a game</Link>
        </Button>
      </div>
    </div>
  );
}
