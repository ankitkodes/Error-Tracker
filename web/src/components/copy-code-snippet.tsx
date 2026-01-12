import { CircleCheck, Copy } from "lucide-react";
import { useState } from "react";

export default function CodeSnippet({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <>
      <div className="flex justify-between border px-2 py-2 rounded-md bg-gray-100 font-serif">
        <pre className="text-xs px-1 py-2 whitespace-pre-wrap">{code}</pre>

        <div>
          <button
            onClick={() => {
              setCopied(true);
              navigator.clipboard.writeText("npm install bugtrace-sdk/node");
              setTimeout(() => {
                setCopied(false);
              }, 1000);
              // setCopied(false);
            }}
            className="cursor-pointer"
          >
            {copied ? (
              <CircleCheck
                size={18}
                className="inline-block mr-1 text-green-400"
              />
            ) : (
              <Copy className="inline-block mr-1" size={15} />
            )}{" "}
          </button>
        </div>
      </div>
    </>
  );
}
