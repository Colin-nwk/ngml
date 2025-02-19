
import * as Dialog from "@radix-ui/react-dialog";
import { useQuestionContext } from "@/context/QuestionContext.js";

function PreviewDialogBtn() {
  
  const { questions } = useQuestionContext();

  console.log(questions);

  return (
    <div>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button className="btn-primary">Preview</button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-100 z-40" />
          <Dialog.Content
            className="fixed top-1/2 left-1/2 w-[90%] lg:w-[60%] h-[90vh] p-6 bg-white rounded-lg transform -translate-x-1/2 -translate-y-1/2 overflow-y-auto z-50"
            style={{ maxHeight: "100vh" }}
          >
            <Dialog.Close asChild>
              <button
                className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label="Close"
              >
                &times;
              </button>
            </Dialog.Close>
            <Dialog.Title className="text-lg font-semibold">
              Form Preview
            </Dialog.Title>
            <Dialog.Description className="mt-2 text-sm text-gray-500">
              This is how your form will look like to your users.
            </Dialog.Description>

            <div>
              <div className="mt-4">
                {questions?.length > 0 ? (
                  questions.map((element) =>
                    element.elementType == "title" ? (
                      <h1
                        key={element?.id}
                        className="mb-4 text-4xl font-bold leading-tight text-gray-900"
                      >
                        {element?.text}
                      </h1>
                    ) : element.elementType == "subtitle" ? (
                      <h2
                        key={element?.id}
                        className="mb-4 text-3xl font-semibold leading-snug text-gray-800"
                      >
                        {element?.text}
                      </h2>
                    ) : element.elementType == "separator" ? (
                      <div className="w-[100%] my-4 border border-gray-400"></div>
                    ) : element.elementType == "spacer" ? (
                      <div key={element?.id}>
                        <br />
                        <br />
                      </div>
                    ) : element.elementType == "text" ? (
                      <div className="p-4 border rounded-md mb-4">
                        <input
                          type="text"
                          name="question"
                          value={element?.name}
                          className="mb-2 text-lg font-medium text-gray-600 border-none outline-none"
                          placeholder="Enter a question"
                          required
                        />
                        <input
                          type="text"
                          className="w-full p-2 text-base border-none outline-none"
                          placeholder="Enter your answer"
                          required
                        />
                      </div>
                    ) : element.elementType == "textarea" ? (
                      <div className="p-4 border rounded-md mb-4">
                        <input
                          type="text"
                          name="question"
                          value={element?.text}
                          className="mb-2 text-lg font-medium text-gray-600 border-none outline-none"
                          placeholder="Enter a question"
                          required
                        />
                        <textarea
                          name="textarea"
                          // value={textarea}
                          className="w-full p-2 text-base border-none outline-none resize-none"
                          placeholder="Enter your long text here"
                          rows={5}
                          required
                        />
                      </div>
                    ) : element.elementType == "number" ? (
                      <div key={element?.id} className="mt-4">
                        {element?.text}
                        <input
                          type="number"
                          name="number"
                          className="w-full p-2 text-base border outline-none mt-2"
                          placeholder="Enter a number"
                          min={0}
                          required
                        />
                      </div>
                    ) : element.elementType == "dropdown" ? (
                      <div key={element?.id}>
                        {element?.text}

                        <select
                          value=""
                          className="w-full p-2 text-base border outline-none mt-2"
                          required
                        >
                          <option value="" disabled>
                            Select an option
                          </option>
                          {element?.options?.map((option, index) => (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : element.elementType == "checkbox" ? (
                      <div key={element?.id} className="p-4 border rounded-md mt-4">
                        {element?.text}
                        <br />

                        {element?.options?.map((checkbox) => (
                          <div
                            key={checkbox.id}
                            className="flex items-center w-full mb-3 mt-2"
                          >
                            <input
                              type="checkbox"
                              checked={checkbox.checked}
                              className="w-5 h-5 mr-2 border border-none outline-none"
                            />
                            <p className="text-sm font-medium text-gray-600 ">
                              {checkbox.label}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : element.elementType == "radiobox" ? (
                      <div key={element?.id} className="p-4 border rounded-md mt-4">
                        {element?.text}
                        {element?.options?.map((radioButton) => (
                          <div
                            key={radioButton.id}
                            className="flex items-center w-full py-2"
                          >
                            <input
                              type="radio"
                              name="radioGroup"
                              className="w-5 h-5 mr-2 border-none outline-none"
                            />
                            <p className="text-sm font-medium text-gray-600">
                              {radioButton.label}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : element.elementType == "date" ? (
                      <div key={element?.id}>efewfw</div>
                    ) : element.elementType == "time" ? (
                      <div key={element?.id}>efewfw</div>
                    ) : (
                      <div key={element?.id}>{element?.text}</div>
                    )
                  )
                ) : (
                  <div>No questions available.</div>
                )}
              </div>
            </div>

            <Dialog.Close asChild>
              <button className="btn-secondary absolute bottom-4 right-6 ">
                Close
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

export default PreviewDialogBtn;
