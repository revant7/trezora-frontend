import React, { useEffect, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export default function ProductPage() {
  const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY"; // 🔹 Replace with your actual API key
  const [description, setDescription] = useState("Fetching description...");

  const fetchGeminiDescription = async (productName) => {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `Give a detailed product description for "${productName}".` }] }],
          }),
        }
      );

      const data = await response.json();
      console.log("Gemini API Response:", data); // Debugging: Check actual response format

      // 🔹 Extracting the correct description format
      const generatedDescription =
        data.candidates?.[0]?.content?.parts?.[0]?.text || "No description available.";
      setDescription(generatedDescription);
    } catch (error) {
      console.error("Error fetching description:", error);
      setDescription("Failed to generate description.");
    }
  };

  useEffect(() => {
    fetchGeminiDescription("OnePlus Phone"); // 🔹 Fetching description for OnePlus
  }, []);

  return (
    <div>
      <h1 className="text-center">Product Page</h1>
      <div style={{ textAlign: "center" }}>
        <TransformWrapper defaultScale={1} minScale={1} maxScale={4} wheel={{ step: 0.1 }}>
          <TransformComponent>
            <img
              src="/images/oneplus.jpg"
              alt="OnePlus Phone"
              width="300"
              height="400"
              style={{ cursor: "move" }}
            />
          </TransformComponent>
        </TransformWrapper>
      </div>
      {/* 🔹 Displaying the fetched product description */}
      <p style={{  disply:"flex" ,justify:"center",textAlign: "center", marginTop: "20px", fontSize: "18px" }}>{description}</p>
    </div>
  );
}




