import { useState, useRef } from "react";
import { MdContentCopy } from "react-icons/md";

import convertString2Score from "../../utils/convertString2Score";

export default function Evaluate() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [originText, setOriginText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [mailScore, setMailScore] = useState(0);
  const [loading, setLoading] = useState(false);

  const originTextRef = useRef(null);
  const translatedTextRef = useRef(null);

  const handleCopy = (type) => {
    let targetText = translatedText;
    if (type === "origin") {
      targetText = originText;
    }

    navigator.clipboard
      .writeText(targetText)
      .then(() => {
        alert("클립보드에 복사되었습니다.");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  const fetchNewText = async () => {
    setLoading(true);
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
      if (isNaN(score) || text === "")
        throw "parsed string didn't match any text or score";
      setTranslatedText(text);
      setMailScore(score);
    } catch (error) {
      alert("실패");
      setTranslatedText("");
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    fetchNewText();
  };

  return (
    <section className="mt-32 h-full">
      <div className="w-10/12 mx-auto">
        <div className="w-full flex flex-col gap-y-8 md:flex-row md:gap-x-8">
          <div className="flex-1">
            <div className="px-5 py-3 border border-b-transparent text-lg bg-gray-50 rounded-t-md">
              MZ어
            </div>
            <div className="w-full h-48">
              <textarea
                ref={originTextRef}
                className="w-full h-full p-5 border"
                value={originText}
                onChange={(e) => setOriginText(e.target.value)}
                placeholder="내용을 입력하세요"
              />
            </div>
            <div className="border border-t-transparent text-base bg-gray-50 rounded-b-md flex justify-between overflow-hidden">
              <button
                className="px-5 py-3 h-12"
                onClick={() => handleCopy("origin")}
              >
                <MdContentCopy />
              </button>
              <button
                className="px-5 py-3 bg-amber-300 text-white"
                onClick={handleClick}
              >
                번역하기
              </button>
            </div>
          </div>
          <div className="flex-1">
            <div className="px-5 py-3 border border-b-transparent text-lg bg-gray-50 rounded-t-md">
              교수어
            </div>
            <div className="w-full h-48">
              {loading ? (
                <div className="spinner-container w-full h-full p-5 border">
                  <div className="spinner"></div>
                </div>
              ) : (
                <textarea
                  ref={translatedTextRef}
                  className="w-full h-full p-5 border"
                  value={translatedText}
                  onChange={(e) => setTranslatedText(e.target.value)}
                  placeholder="내용을 입력하세요"
                />
              )}
            </div>
            <div className="border border-t-transparent text-base bg-gray-50 rounded-b-md flex justify-between overflow-hidden">
              <button
                className="px-5 py-3 h-12"
                onClick={() => handleCopy("translated")}
              >
                <MdContentCopy />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-10/12 mx-auto pt-10">
        {translatedText !== "" && !isNaN(mailScore) && (
          <div>
            <span className="">원문 메일 점수: </span>
            <span className="font-bold text-xl">{`${mailScore}점`}</span>
          </div>
        )}
      </div>
    </section>
  );
}
