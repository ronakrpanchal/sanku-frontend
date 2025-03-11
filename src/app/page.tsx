import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import { Instrument_Serif } from "next/font/google";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export default function Home() {
  return (
    <>
      <Navbar></Navbar>
      <Hero></Hero>
      <IntroducingSenku />
      <HowItWroks />
    </>
  );
}

const IntroducingSenku = () => {
  return (
    <div className="wrapper flex justify-center flex-col items-center mt-10 space-y-3">
      <h2 className="text-xl font-bold uppercase gradient-text">
        Introducing Senku
      </h2>
      <h1 className="text-4xl text-center w-xl ">
        We can understand.{" "}
        <span className="text-[#4D4D4D]">
          Tracking workouts, pushing PRs, and staying consistent isn’t easy.{" "}
        </span>
        <span className="text-[#4D4D4D]">
          Your AI-powered training partner keeps you on track, motivated, and
          making real progress with every rep and set.{" "}
        </span>
        <br />
        That’s where Gymbro comes in.{" "}
      </h1>
    </div>
  );
};

const HowItWroks = () => {
  const content = [
    {
      id: 1,
      title: "Create Your Routine",
      description: "this is random text",
    },
    {
      id: 2,
      title: "Start Workout",
      description: "this is random text",
    },
    {
      id: 3,
      title: "Let Sanku handle your work",
      description: "this is random text",
    },
  ];
  return (
    <div className="wrapper flex flex-col justify-center items-center mt-30 space-y-5 relative">
      <span className="border shadow-xl border-gray-800 px-3 py-1 rounded-full">
        How it works
      </span>
      {/* Header text */}
      <h1 className="text-5xl">
        Getting Started is{" "}
        <span className={`${instrumentSerif.className} italic`}>Simple</span>
      </h1>
      <p className="text-gray-400">
        A simple three step process to your workout organised
      </p>
      <div className="gradient-bg absolute" />
      {/* cards */}
      <div className="grid grid-cols-3 gap-10 w-full px-20 h-[30rem] relative mt-10">
        {content.map((process) => (
          <fieldset
            key={process.id}
            className="p-7 border border-gray-800 rounded-[2.2rem] shadow-2xl bg-[#1717171b] flex flex-col h-full"
          >
            <legend className="border border-gray-800 py-2 px-5 mx-auto rounded-full bg-[#171717]">
              {process.id}
            </legend>
            <div className="mt-auto space-y-2">
              <h3 className="text-2xl">{process.title}</h3>
              <span className="text-md text-gray-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
                nostrum inventore, error rerum optio eum qui saepe voluptatibus
                beatae excepturi.
              </span>
            </div>
          </fieldset>
        ))}
      </div>
    </div>
  );
};
