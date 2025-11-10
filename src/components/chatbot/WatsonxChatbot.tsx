import React, { useEffect } from "react";

export default function WatsonxChatbot() {
  useEffect(() => {
    // ✅ Prevent duplicate loading
    if (document.getElementById("watsonx-assistant")) return;

    // IBM Watson Assistant config
    window.watsonAssistantChatOptions = {
      integrationID: "faf6072c-9185-4bb1-88d4-f9fcfd6afa16", // your integration ID
      region: "au-syd", // region
      serviceInstanceID: "7a480fd2-a805-4d02-860c-465258ab8e5b", // instance ID
      onLoad: async (instance) => {
        await instance.render(); // render chatbot UI
      },
    };

    // ✅ Inject the Watson script dynamically
    const script = document.createElement("script");
    script.id = "watsonx-assistant";
    script.src =
      "https://web-chat.global.assistant.watson.appdomain.cloud/versions/" +
      (window.watsonAssistantChatOptions.clientVersion || "latest") +
      "/WatsonAssistantChatEntry.js";
    script.async = true;

    document.head.appendChild(script);

    return () => {
      // optional cleanup if the component unmounts
      const oldScript = document.getElementById("watsonx-assistant");
      if (oldScript) oldScript.remove();
    };
  }, []);

  return null; // nothing visible, Watson handles rendering
}
