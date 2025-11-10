import React, { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!open) return; // Load Watsonx only when opened

    // 🧠 IBM Watsonx Configuration
    (window as any).wxOConfiguration = {
      orchestrationID:
        "20251105-1923-5058-6078-58facd960e0c_20251105-1924-0335-00ab-72003d8981a1",
      hostURL: "https://ap-south-1.dl.watson-orchestrate.ibm.com",
      rootElementID: "wxo-chat-container",
      chatOptions: {
        agentId: "e693450d-be9f-43e9-800c-54f52e4dca42",
        agentEnvironmentId: "fd5569ba-a735-4d3c-a5f7-3e81730e31c0",
      },
    };

    // ✅ Prevent duplicate script injection
    const existingScript = document.getElementById("wxoScript");
    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "wxoScript";
      script.src = `${(window as any).wxOConfiguration.hostURL}/wxochat/wxoLoader.js?embed=true`;
      script.async = true;
      script.onload = () => {
        if ((window as any).wxoLoader) {
          (window as any).wxoLoader.init();
          setIsLoaded(true);
        }
      };
      document.head.appendChild(script);
    } else if ((window as any).wxoLoader) {
      (window as any).wxoLoader.init();
      setIsLoaded(true);
    }
  }, [open]);

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg flex items-center justify-center transition-transform hover:scale-110"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      ) : (
        <div
          className="bg-white shadow-2xl rounded-xl w-96 h-[500px] flex flex-col border border-blue-300 animate-slide-up"
          style={{ animation: "slideUp 0.3s ease-in-out" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2 bg-blue-600 text-white rounded-t-xl">
            <h3 className="font-semibold text-sm">
              Tele Sandhai Live Assistant
            </h3>
            <button
              onClick={() => setOpen(false)}
              className="hover:text-gray-200 transition"
            >
              <X size={18} />
            </button>
          </div>

          {/* Chat Section */}
          <div
            id="wxo-chat-container"
            className="flex-1 bg-gray-50 flex items-center justify-center text-gray-500 text-sm"
          >
            {!isLoaded && "⏳ Loading Tele Sandhai Assistant..."}
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-gray-500 py-1 border-t border-blue-100">
            Powered by IBM Watsonx Orchestrate
          </div>
        </div>
      )}
    </div>
  );
}

// Small animation
const style = document.createElement("style");
style.innerHTML = `
@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}`;
document.head.appendChild(style);
