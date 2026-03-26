"use client";
import React, { useEffect } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Instrument_Serif } from "next/font/google";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export default function LoginCard() {
  useEffect(() => {
    const toastMessages = [
      {
        title: "Heads Up",
        description:
          "You've been on Instagram for 30 minutes. Still want to be doing this?",
        action: {
          label: "Nope",
          onClick: () => console.log("User clicked Nope"),
        },
      },
      {
        title: "Set the Mood? 🎧",
        description:
          "You're in work mode. Want me to play your deep focus playlist?",
        action: {
          label: "Play 🎵",
          onClick: () => console.log("User clicked Play"),
        },
      },
      {
        title: "Sanku check-in",
        description: "Hey there! How's your day going so far?",
        action: {
          label: "Great!",
          onClick: () => console.log("User is having a great day"),
        },
      },
      {
        title: "Remember",
        description: "Drink some water. Stay hydrated!",
        action: {
          label: "Thanks",
          onClick: () => console.log("User acknowledged hydration reminder"),
        },
      },
    ];

    const showRandomToast = () => {
      const randomIndex = Math.floor(Math.random() * toastMessages.length);
      const message = toastMessages[randomIndex];

      toast(message.title, {
        description: message.description,
        action: message.action,
        position: "top-center",
        duration: 5000,
      });
    };

    // Show initial toast after a short delay
    const initialTimeout = setTimeout(() => {
      toast("Sanku- Hey, how you doing?", {
        description: "Welcome back to the platform!",
        position: "top-right",
      });
    }, 2000);

    // Set interval to show toasts every minute
    const intervalId = setInterval(showRandomToast, 60000); // 60000 ms = 1 minute

    // Clean up on component unmount
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="gradient-bg absolute top-10 right-[47%]" />
      <Card className="w-96 bg-gray-500/10 text-white">
        <CardHeader className="text-center pb-2">
          <h2 className="text-4xl font-bold">Login</h2>
          <p className="text-gray-400">Sanku- Hey, how you doing?</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center px-2">
            <p
              className={`text-sm text-gray-300 ${instrumentSerif.className} italic text-xl font-semibold`}
            >
              &quot;Where AI meets imagination. Your digital companion awaits!&quot;
            </p>
          </div>
          <Button className="w-full flex items-center justify-center gap-2 bg-gray-300 opacity-90 hover:bg-gray-300 hover:opacity-70 text-black cursor-pointer duration-300 transition-all">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Sign in with Google
          </Button>

          <Button
            variant="outline"
            className="w-full mt-2 text-white border-gray-600 hover:bg-gray-700"
            onClick={() => {
              const randomIndex = Math.floor(
                Math.random() * toastMessages.length
              );
              const message = toastMessages[randomIndex];

              toast(message.title, {
                description: message.description,
                action: message.action,
              });
            }}
          >
            Test Toast
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
