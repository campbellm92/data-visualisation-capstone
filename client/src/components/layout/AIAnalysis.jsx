//
//  IFQ717 Web Development Capstone
//
//  AnalyseModal.jsx - Popup modal dialog for LLM analysis of selected data by Gary Cazzulino
//
//

import { useState } from "react";
import { ButtonMediumFullWide } from "../ui/Buttons";
import { kAPI_URL } from "../../api/utils/constants";
import LoadingSpinner from "../ui/LoadingSpinner";
import LLMResponse from "./LLMResponse";
import { SelectLLMPrompt } from "../ui/Select";

function handleSelectChange() {
  document.getElementById("prompt").value = "";
}

const AIAnalysis = ({ dataSet, llmResponse, setllmResponse }) => {

  function closeForm() {
    setllmResponse(kDefaultResponse);
    document.getElementById("analyse_modal").close();
  }

  async function doAnalysis(e) {
    const url = `${kAPI_URL}/ai/query_llm`;
    const working = document.getElementById("working");
    const analyseButton = document.getElementById("analyse-button");
    const customPromptField = document.getElementById("prompt");
    const defaultPromptsField = document.getElementById("defaultLLMPrompt");

    setllmResponse("");
    analyseButton.disabled = true;
    working.style = "display:block";
    e.preventDefault();
    e.stopPropagation();

    let promptField = defaultPromptsField;

    if (customPromptField.value.length > 0) promptField = customPromptField;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: promptField.value + " " + JSON.stringify(dataSet),
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (response.error) {
        alert(response.message);
      } else {
        console.log("Success:", data);
      }

      setllmResponse(data.response);
      working.style = "display:none";
      analyseButton.disabled = false;
    } catch (error) {
      setllmResponse(
        "Too much data selected. Please select less data and try again. Version 2 will fix this issue."
      );
      working.style = "display:none";
      analyseButton.disabled = false;
    }
  }

  return (
    <div>
      {/*<dialog id="analyse_modal" className="modal w-full">*/}

      <div className="shadow-md border-1 rounded p-3 relative shadow-lg bg-base-300">
        <form id="prompt-form" method="dialog">
          <label
            id="prompt-label"
            className="form-control text-primary-content"
          >
            <div className="label">
              <span className="text-primary-content">Use a Default Prompt</span>
            </div>
            <SelectLLMPrompt
              id="defaultLLMPrompt"
              handleSelectChange={handleSelectChange}
            />
          </label>
          <label
            id="prompt-label"
            className="form-control text-primary-content"
          >
            <div className="label">
              <span className="text-primary-content">
                Or Write a Custom Prompt
              </span>
            </div>
            <textarea
              id="prompt"
              className="textarea textarea-bordered h-24 text-primary-content shadow-lg bg-base-300"
              placeholder=""
              style={{ maxHeight: "40vh" }}
            ></textarea>
          </label>
        </form>

        <label id="response-label" className="form-control mb-5" style={{ display: "none" }}>
          <div className="label">
            <span className="text-primary-content">LLM Response</span>
          </div>
          <div
            className="shadow-lg overflow-scroll bg-base-300"
            style={{ minHeight: "30vh", maxHeight: "40vh" }}
          >
            <LLMResponse content={llmResponse} />
          </div>
        </label>
        <div className="text-left" id="working" style={{ display: "none" }}>
          <LoadingSpinner />
        </div>

        <div></div>
        <div className="mb-4"></div>
        <ButtonMediumFullWide
          id="analyse-button"
          onClick={(e) => {
            doAnalysis(e);
            return false;
          }}
          textColor={"text-secondary-content"}
        >
          Analyse
        </ButtonMediumFullWide>
        <div className="mb-4"></div>
        <ButtonMediumFullWide
          id="report-button"
          onClick={(e) => {
            generateReport(e);
            return false;
          }}
          disabled={true}
          textColor={"text-secondary-content"}
        >
          Download Report
        </ButtonMediumFullWide>
      </div>
      {/*</dialog>*/}
    </div>
  );
};

export default AIAnalysis;
