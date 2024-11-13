import { useState, useRef, useEffect } from "react";

export default function MZ() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [originText, setOriginText] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  const originTextRef = useRef(null);
  const translatedTextRef = useRef(null);

  const autoResizeTextarea = (textareaRef) => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    autoResizeTextarea(originTextRef);
  }, [originText]);

  useEffect(() => {
    autoResizeTextarea(translatedTextRef);
  }, [translatedText]);

  const fetchNewText = async () => {
    try {
      const res = await fetch(baseUrl + "/translate/professor/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: originText,
        }),
      });

      const { response } = await res.json();
      setTranslatedText(response);
    } catch (error) {
      alert("실패");
      setTranslatedText("");
    }
  };

  const handleClick = () => {
    fetchNewText();
  };

  return (
    <section className="mt-32 h-full">
      <div className="w-10/12 mx-auto">
        <textarea
          ref={originTextRef}
          className="w-full h-40 p-2 mt-4 border rounded"
          value={originText}
          onChange={(e) => setOriginText(e.target.value)}
        />
        <button
          className="mt-12 p-3 rounded-sm bg-gray-300"
          onClick={handleClick}
        >
          공지사항 변환하기
        </button>
        <textarea
          ref={translatedTextRef}
          className="w-full h-40 p-2 mt-4 border rounded"
          value={translatedText}
          onChange={(e) => setTranslatedText(e.target.value)}
        />
      </div>
    </section>
  );
}
