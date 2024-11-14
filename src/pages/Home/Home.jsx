import { useState } from "react";
import toneConnectLogo from "../../assets/TONE_CONNECT.png";
import arsTitle from "../../assets/ARS_logo.png";
import "./styles.css";

import KeywordButton from "../../components/KeywordButton/KeywordButton";

export default function Home() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const defaultKeywords = [
    ["연구실 문의", "성적 문의", "수업 문의", "과제 문의"],
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

  const firstEmptyGroupIndex = keywords.findIndex((group) =>
    group.every((keyword) => !selectedKeywords.includes(keyword))
  );

  return (
    <div className="box">
      {/* Header Section */}
      <header className="header">
  {/* Replace TONE CONNECT text with logo image */}
  <img src={toneConnectLogo} alt="TONE CONNECT" className="TONE_CONNECT"/>
  <img src={arsTitle} alt="보이는 ARS 쪽지 보내기" className="ARS_logo" />

  
</header>

      {/* Content Section */}
      <section className="content">
        {/* Recipients and Subject */}
        <div className="input-group">
          <div className="label">받는이</div>
          <div className="input-box"></div>
        </div>
        <div className="input-group">
          <div className="label">제목</div>
          <div className="input-box"></div>
        </div>

        {/* Keyword Selection */}
        <div className="keywords-title">키워드 선택
        <button className="generate-button" onClick={handleClick}>생성</button>
        </div>
        <div className="keywords-section">
          
          <div className="flex gap-x-3 gap-y-2 flex-wrap">
        {keywords.map((group, index) => (
          <div className="flex gap-x-3 w-full flex-wrap" key={`keyword_group_${index}`}>
            {group.map((keyword, i) => (
              <KeywordButton
                key={`keyword_${index}_${i}`}
                content={keyword}
                selectedKeywords={selectedKeywords}
                setSelectedKeywords={setSelectedKeywords}
                keywords={keywords}
                setKeywords={setKeywords}
                disabled={
                  !selectedKeywords.includes(keyword) &&
                  (firstEmptyGroupIndex === -1 || index < firstEmptyGroupIndex)
                }
              />
            ))}
          </div>
        ))}
        </div>
          
        </div>

        {/* Text Area */}
        <textarea
          className="text-area"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="텍스트가 여기 표시됩니다"
        />

        {/* Send Button */}
        <button className="send-button">쪽지 보내기</button>
      </section>
    </div>
  );
}