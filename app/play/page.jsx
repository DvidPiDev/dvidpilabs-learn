import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"

export default function play() {
  return (
    <div className={"flex place-items-center justify-center w-screen h-screen"}>
      <Card className={"text-cornflower-50 bg-black border-none"}>
        <CardHeader>
          <CardTitle>Join a game</CardTitle>
        </CardHeader>
        <CardContent>
          <Label>Game code</Label>
          <InputOTP maxLength={6}>
            <InputOTPGroup>
              <InputOTPSlot className={"border-cornflower-400"} index={0} />
              <InputOTPSlot className={"border-cornflower-400"} index={1} />
              <InputOTPSlot className={"border-cornflower-400"} index={2} />
              <InputOTPSlot className={"border-cornflower-400"} index={3} />
              <InputOTPSlot className={"border-cornflower-400"} index={4} />
              <InputOTPSlot className={"border-cornflower-400"} index={5} />
            </InputOTPGroup>
          </InputOTP>
          <Label>Username</Label>
          <Input type={"text"} className={"bg-black w-[240px]"}/>
        </CardContent>
        <CardFooter className={"flex justify-end"}>
          <Button className={"bg-cornflower-500 hover:bg-cornflower-400"}>Join</Button>
        </CardFooter>
      </Card>
    </div>
  )
}