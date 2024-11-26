import { useState } from "react";
import { ButtonMediumFullWide } from "../ui/Buttons";
import LoadingSpinner from "../ui/LoadingSpinner";
import LLMResponse from "./LLMResponse";
import { SelectLLMPrompt } from "../ui/Select";
import { getLLMResponseFromServer } from "../../api/utils/getUtils";

function AIAnalysisModal({
  dataSet,
  llmResponse,
  setllmResponse,
  setAiAnalysisSelected,
}) {
  const [loading, setIsLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [customPrompt, setCustomPrompt] = useState("");
  const [defaultPrompt, setDefaultPrompt] = useState("");

  const handleSelectChange = () => {
    setCustomPrompt("");
  };

  const closeForm = () => {
    setllmResponse("");
    setAiAnalysisSelected(false);
  };

  const doAnalysis = async (e) {
    e.preventDefault();
    e.stopPropagation();

    setllmResponse("");
    setIsLoading(true);
    setIsButtonDisabled(true);

    const promptField = customPrompt || defaultPrompt;

    try {
      const response = await getLLMResponseFromServer(promptField, dataSet);
      setllmResponse(response);
    } catch (error) {
      setllmResponse(
        "Too much data selected. Please select less data and try again. Version 2 will fix this issue.",
        error
      );
    } finally {
      setIsLoading(false);
      setIsButtonDisabled(false);
    }
    setAiAnalysisSelected(true);
  }

  return (
    <div>
      <dialog id="analyse_modal" className="modal w-full">
        <div className="shadow-md border-1 rounded p-3 relative shadow-lg bg-base-300">
          <form id="prompt-form" method="dialog" onSubmit={doAnalysis}>
            <label
              id="prompt-label"
              className="form-control text-primary-content"
            >
              <div className="label">
                <span className="font-bold text-primary-content">
                  Generate an AI Analysis
                </span>
              </div>
              <div className="label">
                <span className="text-primary-content">
                  By using a Default Prompt
                </span>
              </div>
              <SelectLLMPrompt
                handleSelectChange={handleSelectChange}
                value={defaultPrompt}
                onChange={(e) => setDefaultPrompt(e.target.value)}
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
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                className="textarea textarea-bordered h-24 text-primary-content shadow-lg bg-base-300 max-h-40"
                placeholder="Write your custom prompt here."
              ></textarea>
            </label>
          </form>

          {llmResponse && (
            <label
              id="response-label"
              className="form-control mb-5"
              style={{ display: "none" }}
            >
              <div className="label">
                <span className="text-primary-content">LLM Response</span>
              </div>
              <div className="shadow-lg overflow-scroll bg-base-300 min-h-30 max-h-40">
                <LLMResponse content={llmResponse} />
              </div>
            </label>
          )}

          {loading && (
            <div className="text-center m-2">
              <LoadingSpinner />
            </div>
          )}

          <ButtonMediumFullWide
            onClick={doAnalysis}
            disabled={isButtonDisabled}
            className={isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""}
            textColor="text-secondary-content"
          >
            Analyse
          </ButtonMediumFullWide>
        </div>
      </dialog>
    </div>
  );
}

export default AIAnalysis;
