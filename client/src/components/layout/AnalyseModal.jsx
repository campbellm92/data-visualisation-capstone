import { useState } from "react";
import { ButtonOutlineFullWide } from "../ui/Buttons";
import { kAPI_URL } from "../../api/utils/constants";
import LoadingSpinner from "../ui/LoadingSpinner";

const AnalyseModal = ({ dataSet }) => {

    function closeForm() {
        document.getElementById('response').value = '';
        document.getElementById("analyse_modal").close();
    }

    async function doAnalysis(e) {

        const working = document.getElementById('working');

        working.style = 'display:block';

        e.preventDefault(); e.stopPropagation();

        const url = `${kAPI_URL}/ai/query_llm`;

        // Create form data with URLSearchParams
        const promptField = document.getElementById('prompt');

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ "prompt": promptField.value + ' ' + JSON.stringify(dataSet) }),
            });

            //alert(JSON.stringify(response));

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            // Assuming the response is JSON; adjust if needed
            const data = await response.json();

            if (response.error) {
                alert(response.message);
            }
            else {
                console.log("Success:", data);
            }

            document.getElementById('response').value = data.response;

            working.style = 'display:none';

        } catch (error) {
            console.error("GFC Error:", error);
            document.getElementById('response').value = 'Too much data selected. Please select less data and try again. Version 2 will fix this issue.';
            working.style = 'display:none';
        }
    }

    return (
        <dialog id="analyse_modal" className="modal">
            <div className="modal-box relative">
                <button
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    onClick={() => closeForm()}
                >
                    ✕
                </button>
                <form id="prompt-form" method="dialog" className="modal-backdrop">
                    {/*<p className="text-black">{JSON.stringify(dataSet)}</p>*/}
                    <label id="prompt-label" className="form-control text-base-content">
                        <div className="label">
                            <span className="label-text">The prompt for the LLM</span>
                        </div>
                        <textarea id="prompt" className="textarea textarea-bordered h-24 text-base-content" placeholder="prompt">
                            Are there any patterns in the selected data?
                        </textarea>
                    </label>
                </form>

                <label id="response-label" className="form-control mb-5">
                    <div className="label">
                        <span className="label-text">LLM Response</span>
                    </div>
                    <textarea id="response" readOnly className="textarea textarea-bordered h-24 text-base-content">
                    </textarea>
                </label>
                <div className="text-center" id="working" style={{ display: 'none' }}>
                    <LoadingSpinner />
                </div>
                <ButtonOutlineFullWide id="analyse-button" children="Analyse" onClick={(e) => { doAnalysis(e); return false; }} />
            </div>

        </dialog>
    );
};

export default AnalyseModal;
