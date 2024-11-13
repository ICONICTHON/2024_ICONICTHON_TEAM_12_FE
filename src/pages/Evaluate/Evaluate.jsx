import { useState, useRef, useEffect } from "react";

import convertString2Score from "../../utils/convertString2Score";

export default function Evaluate() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [originText, setOriginText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [mailScore, setMailScore] = useState(0);

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
      const res = await fetch(baseUrl + "/translate/student/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: originText,
        }),
      });

      const { response } = await res.json();
      const { score, text } = convertString2Score(response);
      setTranslatedText(text);
      setMailScore(score);
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
          메일 공손하게 변환하기
        </button>
        <textarea
          ref={translatedTextRef}
          className="w-full h-40 p-2 mt-4 border rounded"
          value={translatedText}
          onChange={(e) => setTranslatedText(e.target.value)}
        />
        {translatedText !== "" && (
          <div>
            <span className="">원문 메일 점수: </span>
            <span className="font-bold text-xl">{`${mailScore}점`}</span>
          </div>
        )}
      </div>
    </section>
  );
}
