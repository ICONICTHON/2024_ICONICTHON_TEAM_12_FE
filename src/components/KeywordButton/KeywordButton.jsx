import { useState } from "react";

import "./styles.css";
import convertNewKeywordString from "../../utils/convertNewKeywordString";

/* eslint-disable react/prop-types */
export default function KeywordButton({
  content,
  selectedKeywords,
  setSelectedKeywords,
  setKeywords,
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

    if (!currentlyClicked) {
      if (selectedKeywords.length >= 5) {
        console.log(selectedKeywords);
        alert("키워드는 최대 5개까지 설정 가능합니다.");
      } else {
        setClicked(!currentlyClicked);
        setSelectedKeywords((prev) => {
          return [...prev, content];
        });

        const data = await fetchNewKeyword();
        const newKeywords = convertNewKeywordString(data?.text);

        setKeywords((prev) => {
          return [...new Set([...prev, ...newKeywords])];
        });
      }
    } else {
      setClicked(!currentlyClicked);
      setSelectedKeywords((prev) => {
        return prev.filter((item) => item !== content);
      });
    }
  };

  return (
    <button
      className={`keyword-btn ${
        clicked ? "bg-blue-500 text-white" : "bg-gray-100"
      } p-3 rounded-sm`}
      onClick={clickHandler}
    >
      {content}
    </button>
  );
}
