import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const LLMResponse = ({ content }) => {
  return (
    <div className="markdown-content">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
};

export default LLMResponse;
