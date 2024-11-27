import { useContext } from "react";
import { AiAnalysisContext } from "../../context/AiAnalysisProvider";
import { ButtonOutline, ButtonSmall, CloseButton } from "../ui/Buttons";
import LoadingSpinner from "../ui/LoadingSpinner";
import { SelectLLMPrompt } from "../ui/Select";
import Draggable from "react-draggable";
// import { getLLMResponseFromServer } from "../../api/utils/getUtils";

export function AIAnalysisModal({ closeModal, data, user, year }) {
  const {
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
    e.preventDefault();
    doAnalysis(e, data, user, year);
  };

  return (
    <div>
      <Draggable>
        <dialog
          id="analyse_modal"
          className="modal w-full max-w-4xl mx-auto p-4 fixed bottom-1/2 right-1/8 transform -translate-x-1/2 -translate-y-1/2"
          open
        >
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
            <div className="flex justify-end">
              <ButtonOutline
                onClick={handleDoAnalysis}
                disabled={isButtonDisabled}
                className={
                  isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
                }
              >
                Analyse
              </ButtonOutline>
            </div>
            {responseContent && (
              <div className="mb-5">
                <div className="text-primary font-semibold mb-4 p-2">
                  AI-Generated Report:
                </div>
                <div className="overflow-scroll bg-base-200 min-h-30 text-primary-content p-4 rounded-md">
                  {responseContent}
                  <div className="flex justify-end pt-6 gap-4">
                    <ButtonSmall>Save Report</ButtonSmall>
                    <ButtonSmall>Download Report</ButtonSmall>
                  </div>
                </div>
              </div>
            )}
          </div>
        </dialog>
      </Draggable>
    </div>
  );
}
