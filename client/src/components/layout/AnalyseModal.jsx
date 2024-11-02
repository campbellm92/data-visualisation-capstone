//
//  IFQ717 Web Development Capstone
//
//  AnalyseModal.jsx - Popup modal dialog for LLM analysis of selected data by Gary Cazzulino
//
//

import { useState } from "react";
import { ButtonOutlineFullWide } from "../ui/Buttons";
import { kAPI_URL } from "../../api/utils/constants";
import LoadingSpinner from "../ui/LoadingSpinner";
import LLMResponse from './LLMResponse';
import { SelectLLMPrompt } from "../ui/Select";

const kDefaultResponse = 'Hi there, please select a default prompt or enter a custom prompt and click Analyse.';

function handleSelectChange() {
    document.getElementById('prompt').value = '';

}

const AnalyseModal = ({ dataSet }) => {

    const [llmResponse, setllmResponse] = useState(kDefaultResponse);

    function closeForm() {
        setllmResponse(kDefaultResponse);
        document.getElementById("analyse_modal").close();
    }

    async function doAnalysis(e) {

        const url = `${kAPI_URL}/ai/query_llm`;
        const working = document.getElementById('working');
        const analyseButton = document.getElementById('analyse-button');
        const customPromptField = document.getElementById('prompt');
        const defaultPromptsField = document.getElementById('defaultLLMPrompt');

        setllmResponse('');
        analyseButton.disabled = true;
        working.style = 'display:block';
        e.preventDefault(); e.stopPropagation();

        let promptField = defaultPromptsField;

        if (customPromptField.value.length > 0) promptField = customPromptField;

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ "prompt": promptField.value + ' ' + JSON.stringify(dataSet) }),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();

            if (response.error) {
                alert(response.message);
            }
            else {
                console.log("Success:", data);
            }

            setllmResponse(data.response);
            working.style = 'display:none';
            analyseButton.disabled = false;

        } catch (error) {
            setllmResponse('Too much data selected. Please select less data and try again. Version 2 will fix this issue.');
            working.style = 'display:none';
            analyseButton.disabled = false;
        }
    }

    return (
        <dialog id="analyse_modal" className="modal w-full">
            <div className="modal-box relative">
                <button
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    onClick={() => closeForm()}
                >
                    ✕
                </button>
                <form id="prompt-form" method="dialog" className="modal-backdrop">
                    <br></br>
                    <label id="prompt-label" className="form-control text-base-content">
                        <div className="label">
                            <span className="label-text">Default prompts</span>
                        </div>
                        <SelectLLMPrompt id="defaultLLMPrompt" handleSelectChange={handleSelectChange} />
                    </label>
                    <label id="prompt-label" className="form-control text-base-content">
                        <div className="label">
                            <span className="label-text"></span>
                        </div>
                        <textarea id="prompt" className="textarea textarea-bordered h-24 text-base-content box-drop-shadow" placeholder="Or enter a custom prompt"></textarea>
                    </label>
                </form>

                <label id="response-label" className="form-control mb-5">
                    <div className="label">
                        <span className="label-text">LLM Response</span>
                    </div>
                    <div className='box-drop-shadow overflow-scroll' style={{ minHeight: '30vh', maxHeight: '40vh' }}>
                        <LLMResponse content={llmResponse} />
                        <div className="text-left" id="working" style={{ display: 'none' }}>
                            <LoadingSpinner />
                        </div>
                    </div>
                </label>
                <div>

                </div>
                <ButtonOutlineFullWide id="analyse-button" children="Analyse" onClick={(e) => { doAnalysis(e); return false; }} />
            </div>

        </dialog>
    );
};

export default AnalyseModal;
