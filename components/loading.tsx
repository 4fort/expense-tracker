"use client";

import { Loader2 } from "lucide-react";
import { useEffect } from "react";

const Loading = () => {
  useEffect(() => {
    // Disable scrolling
    document.body.style.overflow = "hidden";

    // Re-enable scrolling on component unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <div className="absolute h-screen w-screen bg-black/30 flex items-center justify-center z-50">
      <Loader2 className="animate-spin" />
    </div>
  );
};

export default Loading;
