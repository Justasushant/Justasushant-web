
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-surface">
      <div className="flex space-x-2">
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className="w-3 h-3 bg-accent rounded-full animate-bounce"
            style={{
              animationDelay: `${index * 0.2}s`,
              animationDuration: '1.2s'
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
