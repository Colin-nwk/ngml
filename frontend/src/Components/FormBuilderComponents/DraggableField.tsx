import { LuHeading1, LuHeading2, LuSeparatorHorizontal } from "react-icons/lu";
import { BsTextParagraph } from "react-icons/bs";
import { RiSeparator } from "react-icons/ri";
import { MdTextFields } from "react-icons/md";
import {
  Bs123,
  BsTextareaResize,
  BsFillCalendarDateFill,
} from "react-icons/bs";
import { RxDropdownMenu } from "react-icons/rx";
import { IoMdCheckbox, IoMdTimer } from "react-icons/io";
import { RiListRadio } from "react-icons/ri";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const DraggableField = ({ name }: { name: string }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: name,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    zIndex: isDragging ? 1000 : "auto",
    width: "110px",
  };

  let layoutTitle: string;
  let layoutIcon: React.ReactElement;

  switch (name) {
    case "title":
      layoutIcon = <LuHeading1 />;
      layoutTitle = "Title field";
      break;
    case "subtitle":
      layoutIcon = <LuHeading2 />;
      layoutTitle = "Subtitle field";
      break;
    case "paragraph":
      layoutIcon = <BsTextParagraph />;
      layoutTitle = "Paragraph field";
      break;
    case "separator":
      layoutIcon = <RiSeparator />;
      layoutTitle = "Separator field";
      break;
    case "spacer":
      layoutIcon = <LuSeparatorHorizontal />;
      layoutTitle = "Spacer field";
      break;
    case "text":
      layoutIcon = <MdTextFields />;
      layoutTitle = "Text field";
      break;
    case "number":
      layoutIcon = <Bs123 />;
      layoutTitle = "Number field";
      break;
    case "textarea":
      layoutIcon = <BsTextareaResize />;
      layoutTitle = "Textarea field";
      break;
    case "date":
      layoutIcon = <BsFillCalendarDateFill />;
      layoutTitle = "Date field";
      break;
    case "dropdown":
      layoutIcon = <RxDropdownMenu />;
      layoutTitle = "Dropdown field";
      break;
    case "checkbox":
      layoutIcon = <IoMdCheckbox />;
      layoutTitle = "Checkbox field";
      break;
    case "radiobox":
      layoutIcon = <RiListRadio />;
      layoutTitle = "Radiobox field";
      break;
    case "time":
      layoutIcon = <IoMdTimer />;
      layoutTitle = "Time field";
      break;
    default:
      layoutIcon = <LuHeading1 />;
      layoutTitle = "Title field";
      break;
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="flex flex-col w-[48%] px-2 py-4 items-center justify-center space-y-2 bg-white border-[1.5px] border-dashed border-dark-green/20 rounded-md hover:border-solid hover:border-dark-green"
    >
      <span className="text-3xl text-dark-green">{layoutIcon}</span>
      <p className="text-sm font-medium text-center">{layoutTitle}</p>
    </div>
  );
};

export default DraggableField;
