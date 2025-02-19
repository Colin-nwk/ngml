/* eslint-disable @typescript-eslint/no-explicit-any */
import { removeElement } from '@/slices/dropElementSlice';
import { useDroppable } from '@dnd-kit/core';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CheckboxField,
  DateField,
  DropdownField,
  NumberField,
  RadioField,
  SeparatorField,
  SpacerField,
  SubtitleField,
  TextField,
  TextareaField,
  TimeField,
  TitleField
} from './DropElements';

// type ElementType = { itemName: string; itemPosition: number };

type ElementType = { itemName: string; itemPosition: number };

interface DropAreaProps {
  onDrop: (event: any) => void;
  handleReplaceMode: (index: number) => void;
  replaceIndex: number | null;
  replaceMode: boolean;
  handleDropArea: (isOver: boolean) => void;
  elements: ElementType[];
}


export type ElementName =
  | 'title'
  | 'subtitle'
  | 'separator'
  | 'spacer'
  | 'text'
  | 'textarea'
  | 'number'
  | 'dropdown'
  | 'checkbox'
  | 'radiobox'
  | 'date'
  | 'time';

type FieldItemType = {
  [key in ElementName]: React.FC<{
    handleRemove: (index: number) => void;
    handleReplace: (index: number) => void;
    index: number;
    replaceIndex: number | null;
    replaceMode: boolean;
  }>;
};

const FieldItem: FieldItemType = {
  title: TitleField,
  subtitle: SubtitleField,
  separator: SeparatorField,
  spacer: SpacerField,
  text: TextField,
  textarea: TextareaField,
  number: NumberField,
  dropdown: DropdownField,
  checkbox: CheckboxField,
  radiobox: RadioField,
  date: DateField,
  time: TimeField,
};

const DropArea: React.FC<DropAreaProps> = ({
  onDrop,
  handleReplaceMode,
  replaceIndex,
  replaceMode,
  handleDropArea,
}: {
  onDrop: (event: any) => void;
  handleReplaceMode: (index: number) => void;
  replaceIndex: number | null;
  replaceMode: boolean;
  handleDropArea: (isOver: boolean) => void;
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id: 'drop-area',
  });


  useEffect(() => {
    handleDropArea(isOver);
  }, [isOver, handleDropArea]);

  const dispatch = useDispatch();

  const elements = useSelector((state: any) => state.elements as ElementType[]);


  const handleDelete = (index: number) => {
    dispatch(removeElement(index));
  };

  const handleReplace = (index: number) => {
    handleReplaceMode(index);
  };

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col space-y-4 w-full h-full px-4 py-6 bg-[#eceef3]  border-gray-400 rounded-lg overflow-y-auto
        ${isOver ? 'border-4' : 'border'}
        ${elements?.length
          ? 'items-start justify-start'
          : 'items-center justify-center'
        }
      `}
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
    >
      {elements.length > 0 ? (
        elements.map((element, index) => {
          const FieldComponent =
            FieldItem[element.itemName as keyof FieldItemType];
          return (
            <FieldComponent
              key={index}
              handleRemove={() => handleDelete(index)}
              handleReplace={() => handleReplace(index)}
              index={index}
              replaceIndex={replaceIndex}
              replaceMode={replaceMode}
            />
          );
        })
      ) : (
        <h1 className="text-3xl font-bold">Drop here</h1>
      )}
    </div>
  );
};

export default DropArea;



















