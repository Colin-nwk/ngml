import { useEffect, useState } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { GoArrowSwitch } from "react-icons/go";
// import { toast } from "react-toastify";
import { useQuestionContext } from "@/context/QuestionContext";
import { toast } from "react-toastify";

export const FieldWrapper = ({
  isFocused,
  children,
  handleRemove,
  handleReplace,
  index,
  replaceIndex,
  replaceMode,
}: {
  isFocused: boolean;
  children: React.ReactNode;
  handleRemove: () => void;
  handleReplace: (index: number) => void;
  index: number;
  replaceIndex: number | null;
  replaceMode: boolean;
}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-2">
      <div
        className={`relative bg-white flex w-full p-4 border rounded-md transition-all duration-300 ease-in-out ${
          replaceIndex === index && replaceMode === true
            ? "shadow-[0_0_4px_1px_#005828]"
            : isFocused
            ? "border-l-4 border-dark-green"
            : "border-l-4 border-gray-300"
        }`}
      >
        <div className="flex flex-col rounded-md w-[85%]">{children}</div>
        <div className="flex flex-row absolute top-0 right-0 z-10 w-[80px] h-full border-r rounded-r-md">
          <div
            className={`flex items-center justify-center w-[40px] h-full hover:cursor-pointer hover:bg-dark-green/20 ${
              replaceIndex === index && replaceMode === true
                ? "bg-dark-green/20"
                : ""
            }`}
            title={`${
              replaceIndex === index && replaceMode === true
                ? "Exit Replace Mode"
                : "Replace Item"
            }`}
            onClick={() => handleReplace(index)}
          >
            <GoArrowSwitch className="text-lg text-dark-green" />
          </div>
          <div
            className="flex items-center justify-center w-[40px] h-full hover:cursor-pointer hover:bg-color-bright-red/20 border-r rounded-r-md"
            title="Remove item"
            onClick={handleRemove}
          >
            <RiDeleteBin5Fill className="text-lg text-color-bright-red" />
          </div>
        </div>
      </div>
      {replaceIndex === index && replaceMode === true ? (
        <p className="text-sm font-semibold text-dark-green animate-fade">
          Drag an element to replace the field above
        </p>
      ) : null}
    </div>
  );
};

export const TitleField = ({
  handleRemove,
  handleReplace,
  index,
  replaceIndex,
  replaceMode,
}: {
  handleRemove: (index: number) => void;
  handleReplace: (index: number) => void;
  index: number;
  replaceIndex: number | null;
  replaceMode: boolean;
}) => {
  const [title, setTitle] = useState<string>("Enter a Title");
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const { addQuestion, deleteQuestion } = useQuestionContext();
  const newQuestion = { id: index, text: title, elementType: "title" };

  const handleBlur = () => {
    setIsFocused(false);
    addQuestion(newQuestion);
  };

  return (
    <FieldWrapper
      isFocused={isFocused}
      handleRemove={() => {
        deleteQuestion(index);
        handleRemove(index);
      }}
      handleReplace={handleReplace}
      index={index}
      replaceIndex={replaceIndex}
      replaceMode={replaceMode}
    >
      <input
        type="text"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
        className="w-full p-2 text-3xl font-bold border-none outline-none"
        placeholder="Enter a Title"
        required
      />
    </FieldWrapper>
  );
};

export const SubtitleField = ({
  handleRemove,
  handleReplace,
  index,
  replaceIndex,
  replaceMode,
}: {
  handleRemove: (index: number) => void;
  handleReplace: (index: number) => void;
  index: number;
  replaceIndex: number | null;
  replaceMode: boolean;
}) => {
  const [subTitle, setSubTitle] = useState<string>("Enter a Subtitle");
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const { addQuestion, deleteQuestion } = useQuestionContext();
  const newQuestion = { id: index, text: subTitle, elementType: "subtitle" };

  const handleBlur = () => {
    setIsFocused(false);
    addQuestion(newQuestion);
  };

  return (
    <FieldWrapper
      isFocused={isFocused}
      handleRemove={() => {
        deleteQuestion(index);
        handleRemove(index);
      }}
      handleReplace={handleReplace}
      index={index}
      replaceIndex={replaceIndex}
      replaceMode={replaceMode}
    >
      <input
        type="text"
        name={subTitle}
        value={subTitle}
        onChange={(e) => setSubTitle(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
        className="w-full p-2 text-xl font-bold border-none outline-none"
        placeholder="Enter a Subtitle"
        required
      />
    </FieldWrapper>
  );
};

export const SeparatorField = ({
  handleRemove,
  handleReplace,
  index,
  replaceIndex,
  replaceMode,
}: {
  handleRemove: (index: number) => void;
  handleReplace: (index: number) => void;
  index: number;
  replaceIndex: number | null;
  replaceMode: boolean;
}) => {
  const { addQuestion, deleteQuestion } = useQuestionContext();
  const newQuestion = { id: index, elementType: "separator" };

  useEffect(() => {
    addQuestion(newQuestion);
  }, []);

  return (
    <div className="relative flex w-full">
      <div className="w-[85%] my-4 border border-gray-400"></div>
      <div className="flex flex-row absolute top-0 right-0 z-10 w-[80px] h-full">
        <div
          className={`flex items-center justify-center w-[40px] h-full hover:cursor-pointer hover:bg-light-green/20 ${
            replaceIndex === index && replaceMode === true
              ? "bg-light-green/20"
              : ""
          }`}
          title={`${
            replaceIndex === index && replaceMode === true
              ? "Exit Replace Mode"
              : "Replace Item"
          }`}
          onClick={() => handleReplace(index)}
        >
          <GoArrowSwitch className="text-lg text-light-green" />
        </div>
        <div
          className="flex items-center justify-center w-[40px] h-full hover:cursor-pointer hover:bg-color-bright-red/20"
          title="Remove item"
          onClick={() => {
            deleteQuestion(index);
            handleRemove(index);
          }}
        >
          <RiDeleteBin5Fill className="text-lg text-color-bright-red" />
        </div>
      </div>
    </div>
  );
};

export const SpacerField = ({
  handleRemove,
  handleReplace,
  index,
  replaceIndex,
  replaceMode,
}: {
  handleRemove: (index: number) => void;
  handleReplace: (index: number) => void;
  index: number;
  replaceIndex: number | null;
  replaceMode: boolean;
}) => {
  const { addQuestion, deleteQuestion } = useQuestionContext();
  const newQuestion = { id: index, elementType: "spacer" };

  useEffect(() => {
    addQuestion(newQuestion);
  }, []);

  return (
    <div className="relative flex w-full">
      <br />
      <br />
      <div className="flex flex-row absolute top-0 right-0 z-10 w-[80px] h-full">
        <div
          className={`flex items-center justify-center w-[40px] h-full hover:cursor-pointer hover:bg-light-green/20 ${
            replaceIndex === index && replaceMode === true
              ? "bg-light-green/20"
              : ""
          }`}
          title={`${
            replaceIndex === index && replaceMode === true
              ? "Exit Replace Mode"
              : "Replace Item"
          }`}
          onClick={() => handleReplace(index)}
        >
          <GoArrowSwitch className="text-lg text-light-green" />
        </div>
        <div
          className="flex items-center justify-center w-[40px] h-full hover:cursor-pointer hover:bg-color-bright-red/20"
          title="Remove item"
          onClick={() => {
            deleteQuestion(index);
            handleRemove(index);
          }}
        >
          <RiDeleteBin5Fill className="text-lg text-color-bright-red" />
        </div>
      </div>
    </div>
  );
};

export const TextField = ({
  handleRemove,
  handleReplace,
  index,
  replaceIndex,
  replaceMode,
}: {
  handleRemove: (index: number) => void;
  handleReplace: (index: number) => void;
  index: number;
  replaceIndex: number | null;
  replaceMode: boolean;
}) => {
  const [question, setQuestion] = useState<string>("Enter a question");
  const [placeholder, setPlaceholder] = useState<string>("Enter a placeholder");
  const [key, setKey] = useState<string>("Enter a key");
  const [text, setText] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const { addQuestion, deleteQuestion } = useQuestionContext();
  const newQuestion = {
    id: index,
    name: question,
    elementType: "text",
    placeholder,
    key,
  };

  const handleBlur = () => {
    setIsFocused(false);
    addQuestion(newQuestion);
  };

  return (
    <FieldWrapper
      isFocused={isFocused}
      handleRemove={() => {
        deleteQuestion(index);
        handleRemove(index);
      }}
      handleReplace={handleReplace}
      index={index}
      replaceIndex={replaceIndex}
      replaceMode={replaceMode}
    >
      <input
        type="text"
        name="question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
        className="mb-2 text-lg font-medium text-gray-600 border outline-none p-2"
        placeholder="Enter a question"
        required
      />

      <input
        type="text"
        name="placeholder"
        value={placeholder}
        onChange={(e) => setPlaceholder(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
        className="mb-2 text-lg font-medium text-gray-600 border outline-none mt-2 p-2"
        placeholder="Enter a placeholder"
        required
      />

      <input
        type="text"
        name="key"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
        className="mb-2 text-lg font-medium text-gray-600 border outline-none mt-2 p-2"
        placeholder="Enter a key"
        required
      />

      <input
        type="text"
        name={text}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full p-2 text-base border-none outline-none"
        placeholder="Enter your answer"
        required
      />
    </FieldWrapper>
  );
};

export const TextareaField = ({
  handleRemove,
  handleReplace,
  index,
  replaceIndex,
  replaceMode,
}: {
  handleRemove: (index: number) => void;
  handleReplace: (index: number) => void;
  index: number;
  replaceIndex: number | null;
  replaceMode: boolean;
}) => {
  const [question, setQuestion] = useState<string>("Enter a question");
  const [textarea, setTextarea] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const { addQuestion, deleteQuestion } = useQuestionContext();
  const newQuestion = { id: index, text: question, elementType: "textarea" };

  const handleBlur = () => {
    setIsFocused(false);
    addQuestion(newQuestion);
  };

  return (
    <FieldWrapper
      isFocused={isFocused}
      handleRemove={() => {
        deleteQuestion(index);
        handleRemove(index);
      }}
      handleReplace={handleReplace}
      index={index}
      replaceIndex={replaceIndex}
      replaceMode={replaceMode}
    >
      <input
        type="text"
        name="question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
        className="mb-2 text-lg font-medium text-gray-600 border-none outline-none"
        placeholder="Enter a question"
        required
      />
      <textarea
        name="textarea"
        value={textarea}
        onChange={(e) => setTextarea(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full p-2 text-base border-none outline-none resize-none"
        placeholder="Enter your long text here"
        rows={5}
        required
      />
    </FieldWrapper>
  );
};

export const NumberField = ({
  handleRemove,
  handleReplace,
  index,
  replaceIndex,
  replaceMode,
}: {
  handleRemove: (index: number) => void;
  handleReplace: (index: number) => void;
  index: number;
  replaceIndex: number | null;
  replaceMode: boolean;
}) => {
  const [question, setQuestion] = useState<string>("Enter a question");
  const [number, setNumber] = useState<number | string>(0);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const { addQuestion, deleteQuestion } = useQuestionContext();
  const newQuestion = { id: index, text: question, elementType: "number" };

  const handleBlur = () => {
    setIsFocused(false);
    addQuestion(newQuestion);
  };

  return (
    <FieldWrapper
      isFocused={isFocused}
      handleRemove={() => {
        deleteQuestion(index);
        handleRemove(index);
      }}
      handleReplace={handleReplace}
      index={index}
      replaceIndex={replaceIndex}
      replaceMode={replaceMode}
    >
      <input
        type="text"
        name="question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
        className="mb-2 text-lg font-medium text-gray-600 border-none outline-none"
        placeholder="Enter a question"
        required
      />
      <input
        type="number"
        name="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full p-2 text-base border-none outline-none"
        placeholder="Enter a number"
        min={0}
        required
      />
    </FieldWrapper>
  );
};

export const DropdownField = ({
  handleRemove,
  handleReplace,
  index,
  replaceIndex,
  replaceMode,
}: {
  handleRemove: (index: number) => void;
  handleReplace: (index: number) => void;
  index: number;
  replaceIndex: number | null;
  replaceMode: boolean;
}) => {
  const [question, setQuestion] = useState<string>("Enter a question");
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [newOption, setNewOption] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [mode, setMode] = useState<"manual" | "link">("manual");
  const [link, setLink] = useState<string>("");
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const { addQuestion, deleteQuestion } = useQuestionContext();
  const newQuestion = {
    id: index,
    text: question,
    options: options,
    elementType: "dropdown",
  };

  const handleBlur = () => {
    setIsFocused(false);
    addQuestion(newQuestion);
  };

  const handleAddOption = () => {
    if (newOption.trim() !== "") {
      setOptions([...options, newOption]);
      setNewOption("");
    }
  };

  const handleAddLinkOptions = async () => {
    setIsFetching(true);
    setOptions([]);
    if (link.trim() !== "") {
      try {
        const response = await fetch(link, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          // const data = await response.json();
          // setOptions(data);
          toast.success("Options fetched successfully!");
        } else {
          toast.error("Failed to fetch options from link");
          console.error("Failed to fetch options from link");
        }
      } catch (error: any) {
        toast.error("Internal Server Error");
        console.error("Error fetching options:", error);
      } finally {
        setIsFetching(false);
        setLink("");
      }
    }
  };

  useEffect(() => {
    addQuestion(newQuestion);
  }, [options]);

  return (
    <FieldWrapper
      isFocused={isFocused}
      handleRemove={() => {
        deleteQuestion(index);
        handleRemove(index);
      }}
      handleReplace={handleReplace}
      index={index}
      replaceIndex={replaceIndex}
      replaceMode={replaceMode}
    >
      <input
        type="text"
        name="question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
        className="mb-2 text-lg font-medium text-gray-600 border-none outline-none"
        placeholder="Enter a question"
        required
      />

      <select
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
        className="w-full p-2 text-base border-none outline-none"
        required
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>

      <div className="flex mt-2">
        <button
          onClick={() => {
            setMode("manual");
            setOptions([]);
          }}
          className={`px-4 py-2 mr-2 ${
            mode === "manual" ? "bg-dark-green text-white" : "bg-gray-200"
          } rounded-md`}
        >
          Add Option Manually
        </button>
        <button
          onClick={() => {
            setMode("link");
            setOptions([]);
          }}
          className={`px-4 py-2 ${
            mode === "link" ? "bg-dark-green text-white" : "bg-gray-200"
          } rounded-md`}
        >
          Paste Link
        </button>
      </div>

      {mode === "manual" ? (
        <div className="flex mt-2">
          <input
            type="text"
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="flex-grow p-2 mr-2 border rounded-md outline-none"
            placeholder="Add new option"
          />
          <button
            onClick={handleAddOption}
            className="px-4 py-2 text-white rounded-md bg-dark-green"
          >
            Add
          </button>
        </div>
      ) : (
        <div className="flex mt-2">
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="flex-grow p-2 mr-2 border rounded-md outline-none"
            placeholder="Paste link here"
          />
          <button
            onClick={handleAddLinkOptions}
            className="px-4 py-2 text-white rounded-md bg-dark-green"
          >
            {isFetching ? "Fetching options..." : "Add"}
          </button>
        </div>
      )}
    </FieldWrapper>
  );
};

export const CheckboxField = ({
  handleRemove,
  handleReplace,
  index,
  replaceIndex,
  replaceMode,
}: {
  handleRemove: (index: number) => void;
  handleReplace: (index: number) => void;
  index: number;
  replaceIndex: number | null;
  replaceMode: boolean;
}) => {
  const [question, setQuestion] = useState<string>("Enter a question");
  const [checkboxes, setCheckboxes] = useState<
    Array<{ id: number; label: string; checked: boolean }>
  >([]);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [newCheckboxLabel, setNewCheckboxLabel] = useState<string>("");

  const { addQuestion, deleteQuestion } = useQuestionContext();
  const newQuestion = {
    id: index,
    text: question,
    options: checkboxes,
    elementType: "checkbox",
  };

  const handleBlur = () => {
    setIsFocused(false);
    addQuestion(newQuestion);
  };

  const handleCheckboxChange = (id: number) => {
    setCheckboxes((prevCheckboxes) =>
      prevCheckboxes.map((checkbox) =>
        checkbox.id === id
          ? { ...checkbox, checked: !checkbox.checked }
          : checkbox
      )
    );
  };

  const handleAddCheckbox = () => {
    if (newCheckboxLabel.trim() === "") return;

    const newCheckbox = {
      id: checkboxes.length + 1,
      label: newCheckboxLabel,
      checked: false,
    };

    setCheckboxes([...checkboxes, newCheckbox]);
    setNewCheckboxLabel("");
  };

  useEffect(() => {
    addQuestion(newQuestion);
  }, [checkboxes]);
  return (
    <FieldWrapper
      isFocused={isFocused}
      handleRemove={() => {
        deleteQuestion(index);
        handleRemove(index);
      }}
      handleReplace={handleReplace}
      index={index}
      replaceIndex={replaceIndex}
      replaceMode={replaceMode}
    >
      <input
        type="text"
        name="question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
        className="mb-2 text-lg font-medium text-gray-600 border-none outline-none"
        placeholder="Enter a question"
        required
      />
      {checkboxes.map((checkbox) => (
        <div key={checkbox.id} className="flex items-center w-full mb-3">
          <input
            type="checkbox"
            checked={checkbox.checked}
            onChange={() => handleCheckboxChange(checkbox.id)}
            className="w-5 h-5 mr-2 border border-none outline-none"
          />
          <p className="text-sm font-medium text-gray-600 ">{checkbox.label}</p>
        </div>
      ))}
      <div className="flex mt-2">
        <input
          type="text"
          value={newCheckboxLabel}
          onChange={(e) => setNewCheckboxLabel(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Add new checkbox"
          className="flex-grow p-2 mr-2 border rounded-md outline-none"
        />
        <button
          onClick={handleAddCheckbox}
          className="px-4 py-2 text-white rounded-md bg-dark-green"
        >
          Add
        </button>
      </div>
    </FieldWrapper>
  );
};

export const RadioField = ({
  handleRemove,
  handleReplace,
  index,
  replaceIndex,
  replaceMode,
}: {
  handleRemove: (index: number) => void;
  handleReplace: (index: number) => void;
  index: number;
  replaceIndex: number | null;
  replaceMode: boolean;
}) => {
  const [question, setQuestion] = useState<string>("Enter a question");
  const [radioButtons, setRadioButtons] = useState<
    Array<{ id: number; label: string }>
  >([]);
  const [selectedRadio, setSelectedRadio] = useState<number | null>(null);
  const [newRadioLabel, setNewRadioLabel] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const { addQuestion, deleteQuestion } = useQuestionContext();
  const newQuestion = {
    id: index,
    text: question,
    options: radioButtons,
    elementType: "radiobox",
  };

  const handleBlur = () => {
    setIsFocused(false);
    addQuestion(newQuestion);
  };

  const handleRadioChange = (id: number) => {
    setSelectedRadio(id);
  };

  const handleAddRadioButton = () => {
    if (newRadioLabel.trim() === "") return;

    const newRadioButton = {
      id: radioButtons.length + 1,
      label: newRadioLabel,
    };

    setRadioButtons([...radioButtons, newRadioButton]);
    setNewRadioLabel("");
  };

  useEffect(() => {
    addQuestion(newQuestion);
  }, [radioButtons]);

  return (
    <FieldWrapper
      isFocused={isFocused}
      handleRemove={() => {
        deleteQuestion(index);
        handleRemove(index);
      }}
      handleReplace={handleReplace}
      index={index}
      replaceIndex={replaceIndex}
      replaceMode={replaceMode}
    >
      <input
        type="text"
        name="question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
        className="mb-2 text-lg font-medium text-gray-600 border-none outline-none"
        placeholder="Enter a question"
        required
      />
      {radioButtons.map((radioButton) => (
        <div key={radioButton.id} className="flex items-center w-full py-2">
          <input
            type="radio"
            name="radioGroup"
            checked={selectedRadio === radioButton.id}
            onChange={() => handleRadioChange(radioButton.id)}
            className="w-5 h-5 mr-2 border-none outline-none"
          />
          <p className="text-sm font-medium text-gray-600">
            {radioButton.label}
          </p>
        </div>
      ))}
      <div className="flex mt-2">
        <input
          type="text"
          value={newRadioLabel}
          onChange={(e) => setNewRadioLabel(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Add new radio button"
          className="flex-grow p-2 mr-2 border rounded-md outline-none"
        />
        <button
          onClick={handleAddRadioButton}
          className="px-4 py-2 text-white rounded-md bg-dark-green"
        >
          Add
        </button>
      </div>
    </FieldWrapper>
  );
};

export const DateField = ({
  handleRemove,
  handleReplace,
  index,
  replaceIndex,
  replaceMode,
}: {
  handleRemove: (index: number) => void;
  handleReplace: (index: number) => void;
  index: number;
  replaceIndex: number | null;
  replaceMode: boolean;
}) => {
  const [question, setQuestion] = useState<string>("Enter a question");
  const [date, setDate] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const { addQuestion, deleteQuestion } = useQuestionContext();
  const newQuestion = { id: index, text: question, elementType: "date" };

  const handleBlur = () => {
    setIsFocused(false);
    addQuestion(newQuestion);
  };

  return (
    <FieldWrapper
      isFocused={isFocused}
      handleRemove={() => {
        deleteQuestion(index);
        handleRemove(index);
      }}
      handleReplace={handleReplace}
      index={index}
      replaceIndex={replaceIndex}
      replaceMode={replaceMode}
    >
      <input
        type="text"
        name="question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
        className="mb-2 text-lg font-medium text-gray-600 border-none outline-none"
        placeholder="Enter a question"
        required
      />
      <input
        type="date"
        name="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full p-2 text-base border-none outline-none"
        placeholder="Enter a Date"
        required
      />
    </FieldWrapper>
  );
};

export const TimeField = ({
  handleRemove,
  handleReplace,
  index,
  replaceIndex,
  replaceMode,
}: {
  handleRemove: (index: number) => void;
  handleReplace: (index: number) => void;
  index: number;
  replaceIndex: number | null;
  replaceMode: boolean;
}) => {
  const [question, setQuestion] = useState<string>("Enter a question");
  const [time, setTime] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const { addQuestion, deleteQuestion } = useQuestionContext();
  const newQuestion = { id: index, text: question, elementType: "time" };

  const handleBlur = () => {
    setIsFocused(false);
    addQuestion(newQuestion);
  };

  return (
    <FieldWrapper
      isFocused={isFocused}
      handleRemove={() => {
        deleteQuestion(index);
        handleRemove(index);
      }}
      handleReplace={handleReplace}
      index={index}
      replaceIndex={replaceIndex}
      replaceMode={replaceMode}
    >
      <input
        type="text"
        name="question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
        className="mb-2 text-lg font-medium text-gray-600 border-none outline-none"
        placeholder="Enter a question"
        required
      />
      <input
        type="time"
        name="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full p-2 text-base border-none outline-none"
        required
      />
    </FieldWrapper>
  );
};

export const HiddenField = ({
  handleRemove,
  handleReplace,
  index,
  replaceIndex,
  replaceMode,
}: {
  handleRemove: (index: number) => void;
  handleReplace: (index: number) => void;
  index: number;
  replaceIndex: number | null;
  replaceMode: boolean;
}) => {
  const [hidden, setHidden] = useState<string>("Enter a text");
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const { addQuestion, deleteQuestion } = useQuestionContext();
  const newQuestion = { id: index, text: hidden, elementType: "hidden" };

  const handleBlur = () => {
    setIsFocused(false);
    addQuestion(newQuestion);
  };

  return (
    <FieldWrapper
      isFocused={isFocused}
      handleRemove={() => {
        deleteQuestion(index);
        handleRemove(index);
      }}
      handleReplace={handleReplace}
      index={index}
      replaceIndex={replaceIndex}
      replaceMode={replaceMode}
    >
      <input
        type="text"
        name="hidden"
        value={hidden}
        onChange={(e) => setHidden(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
        className="w-full p-2 text-3xl font-bold border-none outline-none"
        placeholder="Enter a hidden"
        required
      />
    </FieldWrapper>
  );
};
