import { useState, useRef, useEffect } from "react";
import notice from "./notice.js";
import "./styles.css";

export default function MZ() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [originText, setOriginText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [tabState, setTabState] = useState("notice");
  const [loading, setLoading] = useState(false);

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
    if (loading) return;

    setLoading(true);
    try {
      const res = await fetch(baseUrl + "/translate/professor/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: notice.text,
        }),
      });

      const { response } = await res.json();
      setTranslatedText(response);
    } catch (error) {
      alert("실패");
      setTranslatedText("");
    } finally {
      setLoading(false);
    }
  };

  const handleTabClick = (e) => {
    if (e.target.innerHTML === "공지사항") setTabState("notice");
    else {
      setTabState("mz");
      fetchNewText();
    }
  };

  return (
    <section className="mt-32 h-full">
      <div className="w-10/12 mx-auto">
        <div>
          <div className="font-bold text-lg">학습 정보</div>
          <div className="flex pt-10 w-full">
            <button
              className={`px-6 py-2 border ${
                tabState === "notice"
                  ? "bg-white border-b-transparent"
                  : "bg-gray-100"
              }`}
              onClick={handleTabClick}
            >
              공지사항
            </button>
            <button
              className={`px-6 py-2 border ${
                tabState === "mz"
                  ? "bg-white border-b-transparent"
                  : "bg-gray-100"
              }`}
              onClick={handleTabClick}
            >
              MZ어 변환
            </button>
            <div className="flex-1 border-b" />
          </div>

          <div className="w-full pt-10">
            <div className="w-full bg-amber-200 py-3 px-3">시험 공지사항</div>
            <div className="flex px-3 py-3 custom-shadow">
              <div className="flex-1">작성자: </div>
              <div className="flex-1">작성일: </div>
              <div className="flex-1">조회수: </div>
            </div>
            {tabState === "notice" && (
              <div className="flex px-10 py-10 custom-shadow whitespace-pre-line">
                {notice.text}
              </div>
            )}
            {tabState === "mz" && (
              <div className="flex px-10 py-10 w-full custom-shadow whitespace-pre-line">
                {loading ? (
                  <div className="spinner-container w-full flex items-center justify-center">
                    <div className="spinner"></div>
                  </div>
                ) : (
                  translatedText
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
