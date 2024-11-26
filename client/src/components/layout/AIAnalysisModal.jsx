import { useContext } from "react";
import { AiAnalysisContext } from "../../context/AiAnalysisProvider";
import { ButtonMediumFullWide } from "../ui/Buttons";
import { CloseButton } from "../ui/Buttons";
import LoadingSpinner from "../ui/LoadingSpinner";
import { SelectLLMPrompt } from "../ui/Select";
import Draggable from "react-draggable";
// import { getLLMResponseFromServer } from "../../api/utils/getUtils";

export function AIAnalysisModal({ closeModal }) {
  const {
    year,
    loading,
    isButtonDisabled,
    customPrompt,
    setCustomPrompt,
    defaultPrompt,
    setDefaultPrompt,
    LLMResponse: responseContent,
    doAnalysis,
    handleSelectChange,
  } = useContext(AiAnalysisContext);

  const handleDoAnalysis = (e) => {
    doAnalysis(e, dataSet);
  };

  return (
    <div>
      <Draggable>
        <dialog id="analyse_modal" className="modal w-full" open>
          <div className="shadow-md border-1 rounded p-6 relative shadow-lg bg-base-300 bg-opacity-95">
            <div className="flex justify-end">
              <CloseButton onClick={closeModal} />
            </div>

            <form id="prompt-form" method="dialog" onSubmit={handleDoAnalysis}>
              <label
                id="prompt-label"
                className="form-control text-primary-content"
              >
                <div className="label">
                  <span className="font-bold text-primary-content pb-4">
                    Generate an AI analysis of this data...
                  </span>
                </div>
                <div className="label">
                  <span className="text-primary-content pb-2">
                    by using a default prompt:
                  </span>
                </div>
                <div className="pb-4">
                  <SelectLLMPrompt
                    handleSelectChange={handleSelectChange}
                    value={defaultPrompt}
                    onChange={(e) => setDefaultPrompt(e.target.value)}
                  />
                </div>
              </label>
              <label
                id="prompt-label"
                className="form-control text-primary-content"
              >
                <div className="label">
                  <span className="text-primary-content pb-2">
                    or writing a custom prompt:
                  </span>
                </div>
                <div className="pb-4">
                  <textarea
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    className="textarea textarea-bordered h-24 w-full text-primary-content shadow-lg bg-base-300 max-h-40"
                    placeholder="Write your custom prompt here."
                  ></textarea>
                </div>
              </label>
            </form>

            {loading && (
              <div className="text-center m-2">
                <LoadingSpinner />
              </div>
            )}

            <ButtonMediumFullWide
              onClick={handleDoAnalysis}
              disabled={isButtonDisabled}
              className={
                isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
              }
              textColor="text-secondary-content"
            >
              Analyse
            </ButtonMediumFullWide>
          </div>

          {responseContent && (
            <label id="response-label" className="form-control mb-5">
              <div className="label">
                <span className="text-primary-content">LLM Response</span>
              </div>
              <div className="shadow-lg overflow-scroll bg-base-300 min-h-30 max-h-40"></div>
            </label>
          )}
        </dialog>
      </Draggable>
    </div>
  );
}
