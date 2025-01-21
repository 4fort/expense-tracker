"use client";

import React, { useEffect, useState } from "react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { ShareIcon, SquarePlus } from "lucide-react";

const InstallPrompt = () => {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !("MSStream" in window)
    );

    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);
  }, []);

  if (isStandalone) {
    return null; // Don't show install button if already installed
  }

  return (
    <React.Fragment>
      <Separator orientation="horizontal" />
      <div className="flex flex-col w-full p-4 bg-emerald-100/30 border border-emerald-200 rounded-md">
        <h3 className="font-bold text-lg">Install App</h3>
        <span className="opacity-50 mb-2">
          Install the app without downloading!
        </span>
        {!isIOS && <Button>Add to Home Screen</Button>}
        {isIOS && (
          // <p>
          //   To install this app on your iOS device, tap the share button
          //   <span role="img" aria-label="share icon">
          //     {" "}
          //     ⎋{" "}
          //   </span>
          //   and then &quot;Add to Home Screen&quot;
          //   <span role="img" aria-label="plus icon">
          //     {" "}
          //     ➕{" "}
          //   </span>
          //   .
          // </p>
          <div>
            <ul className="list-disc list-inside">
              <li className="flex items-center gap-1 mb-2">
                <ShareIcon className="h-5 w-5 text-blue-500" />
                Tap the share button
              </li>
              <li className="flex items-center gap-1">
                <SquarePlus className="h-5 w-5" />
                Tap &quot;Add to Home Screen&quot;
              </li>
            </ul>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default InstallPrompt;
