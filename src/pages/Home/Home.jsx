import { useState } from "react";
import "./styles.css";

import KeywordButton from "../../components/KeywordButton/KeywordButton";

export default function Home() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const defaultKeywords = [
    "연구실 문의",
    "성적 문의",
    "수업 문의",
    "과제 문의",
  ];
  const [keywords, setKeywords] = useState(defaultKeywords);
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [text, setText] = useState("");

  const fetchNewText = async () => {
    try {
      const res = await fetch(baseUrl + "/mail/write_mail/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          keywords: selectedKeywords.join(", "),
        }),
      });

      const { response } = await res.json();
      setText(response.text);
    } catch (error) {
      alert("실패");
      setText("");
    }
  };
  const handleClick = () => {
    fetchNewText();
  };

  return (
    <section className="mt-32 h-full">
      <div className="w-10/12 mx-auto">
        <div>키워드 선택</div>
        <div className="flex gap-x-3 gap-y-2 flex-wrap">
          {keywords.map((value, index) => (
            <KeywordButton
              key={`keyword_${index}`}
              content={value}
              selectedKeywords={selectedKeywords}
              setSelectedKeywords={setSelectedKeywords}
              setKeywords={setKeywords}
            />
          ))}
        </div>
        <textarea
          className="w-full h-40 p-2 mt-4 border rounded"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="mt-12 p-3 rounded-sm bg-gray-300"
          onClick={handleClick}
        >
          글 작성하기
        </button>
      </div>
    </section>
  );
}
