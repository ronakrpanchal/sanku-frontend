import React from "react";
import Markdown from "react-markdown";

type Props = { isUser: boolean };

export default function MessageBubble({ isUser }: Props) {
  return (
    <div className="flex flex-col space-y-10">
      <div className="bg-gray-400/10 w-xl p-3 rounded-xl right-0 border flex shadow-md self-end">
        please find me a best hotel in gandhinagar Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Voluptatibus voluptate itaque excepturi,
        saepe voluptates voluptatem deserunt qui, minima vitae nisi, ipsum esse
        a? Repellendus, nisi minus dolores ducimus nulla rerum?
      </div>
      <div className="">
        <Markdown>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
          consequatur earum fuga suscipit excepturi nostrum itaque laboriosam ea
          repellat vitae.
        </Markdown>
      </div>
    </div>
  );
}
