import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import aiwatermark from "../../images/aiwatermark.png"; //icons8-ai.gif";//aiwatermark.png";


const LLMResponse = ({ content }) => {
  return (
    <div style={{ position: 'relative' }}>
      <div className="h-[325px] overflow-scroll p-1 bg-base-300">
        <div className="markdown-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
      </div>
      {/*<img src={aiwatermark} className="watermark"></img>  see https://openai.com/brand/ */}
      <p className="watermark">Written with ChatGPT</p>
    </div>
  );
};

export default LLMResponse;
