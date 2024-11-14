import { useState } from "react";

import "./styles.css";
import convertNewKeywordString from "../../utils/convertNewKeywordString";

/* eslint-disable react/prop-types */
export default function KeywordButton({
  content,
  selectedKeywords,
  setSelectedKeywords,
  keywords,
  setKeywords,
  disabled,
}) {
  const [clicked, setClicked] = useState(false);

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const fetchNewKeyword = async () => {
    try {
      const res = await fetch(baseUrl + "/mail/generate_keywords/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          keywords: content,
        }),
      });

      const { response } = await res.json();
      return response;
    } catch (error) {
      alert("새로운 키워드를 받아오는 중 오류가 발생했습니다.");
      return null;
    }
  };

  const clickHandler = async () => {
    const currentlyClicked = clicked;
    setClicked(!currentlyClicked);

    if (!currentlyClicked) {
      setSelectedKeywords((prev) => [...prev, content]);

      const data = await fetchNewKeyword();
      const newKeywords = convertNewKeywordString(data?.text);
      const filteredNewKeywords = newKeywords.filter(
        (value) => !keywords.flat().includes(value)
      );

      setKeywords((prev) => [...prev, filteredNewKeywords]);
    } else {
      const newSelectedKeywords = selectedKeywords.filter(
        (item) => item !== content
      );
      setSelectedKeywords(newSelectedKeywords);

      const levelIndex = keywords.findIndex((level) => level.includes(content));

      setKeywords((prev) => {
        return prev.filter((level, index) => {
          if (index <= levelIndex) {
            return true;
          }
          return level.some((keyword) => newSelectedKeywords.includes(keyword));
        });
      });
    }
  };

  return (
    <button
      className={`keyword-btn ${
        clicked
          ? "bg-blue-500 text-white"
          : disabled
          ? "bg-gray-50 text-gray-200"
          : "bg-gray-100"
      } p-3 rounded-sm`}
      onClick={clickHandler}
      disabled={disabled}
    >
      {content}
    </button>
  );
}
