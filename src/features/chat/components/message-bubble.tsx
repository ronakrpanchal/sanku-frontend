import React from "react";
import Markdown from "react-markdown";
import { Sparkles } from "lucide-react";

type Props = { isUser: boolean };

export default function MessageBubble({ isUser }: Props) {
  return (
    <div className="flex flex-col space-y-10 text-lg font-medium">
      <div className="bg-gray-400/10 max-w-lg p-3 rounded-xl right-0 border flex shadow-md self-end">
        please find me a best hotel in gandhinagar Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Voluptatibus voluptate itaque excepturi,
        saepe voluptates voluptatem deserunt qui, minima vitae nisi, ipsum esse
        a? Repellendus, nisi minus dolores ducimus nulla rerum?
      </div>
      <div className="space-y-2">
        <div className="flex gap-2 items-center">
          <Sparkles size={20} className="text-pink-400" />
          <p>Sanku</p>
        </div>
        <Markdown>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
          consequatur earum fuga suscipit excepturi nostrum itaque laboriosam ea
          repellat vitae. **aklsdjlaskdlj** *asdjlasd*
        </Markdown>
      </div>
    </div>
  );
}
