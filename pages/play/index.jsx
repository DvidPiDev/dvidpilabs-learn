import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import {Poppins} from "next/font/google";
export const poppins = Poppins({ weight: "400", subsets: ['latin'] });
export default function play() {
  return (
    <div className={"flex place-items-center justify-center w-screen h-screen " + poppins.className}>
      <Card className={"text-black border-none"}>
        <CardHeader>
          <CardTitle>Join a game</CardTitle>
        </CardHeader>
        <CardContent>
          <Label>Game code</Label>
          <InputOTP maxLength={6}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <Label>Username</Label>
          <Input type={"text"} className={"w-[240px]"}/>
        </CardContent>
        <CardFooter className={"flex justify-end"}>
          <Button className={"bg-cornflower-500 hover:bg-cornflower-400"}>Join</Button>
        </CardFooter>
      </Card>
    </div>
  )
}