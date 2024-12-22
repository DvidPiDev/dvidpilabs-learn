import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useGame } from '@/context/GameContext';

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
import { Poppins } from "next/font/google";

export const poppins = Poppins({ weight: "400", subsets: ['latin'] });

export default function Play({ socket }) {
  const router = useRouter();
  const { setGameState } = useGame();
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (socket) {
      setIsConnected(true);
      console.log('Socket available in Join page:', socket.id);
    } else {
      setIsConnected(false);
      console.log('Socket not available in Join page');
    }
  }, [socket]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!code || !name) {
      setError('Please fill in both fields');
      return;
    }

    if (!socket || !isConnected) {
      console.error('Socket status:', { socket: !!socket, isConnected });
      setError('Failed to connect to server. Please try again.');
      return;
    }

    try {
      console.log('Attempting to join game...', { code, name });
      socket.off('joined');
      socket.off('error');

      socket.on('joined', ({ playerId, game }) => {
        console.log('Successfully joined game:', { playerId, game });
        setGameState({
          code: parseInt(code, 10),
          playerId,
          playerName: name
        });
        router.push('/game');
      });

      socket.on('error', (msg) => {
        console.error('Received error:', msg);
        setError(msg);
      });

      socket.emit('join-game', {
        code: parseInt(code, 10),
        playerName: name
      });
    } catch (error) {
      console.error('Join game error:', error);
      setError('Failed to join game');
    }
  };

  return (
    <div className={"flex place-items-center justify-center w-screen h-screen " + poppins.className}>
      <Card className={"text-black border-none"}>
        <CardHeader>
          <CardTitle>Join a game</CardTitle>
        </CardHeader>
        <CardContent>
          <Label>Game code</Label>
          <InputOTP maxLength={6} value={code} onChange={(code) => setCode(code)}>
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
          <Input value={name} onChange={(e) => setName(e.target.value)} type={"text"} className={"w-[240px]"}/>
          {error && <p className={"text-red-400"}>{error}</p>}
        </CardContent>
        <CardFooter className={"flex justify-end"}>
          <Button type={"submit"} disabled={!isConnected} onClick={handleSubmit} className={"bg-cornflower-500 hover:bg-cornflower-400"}>Join</Button>
        </CardFooter>
      </Card>
    </div>
  )
}