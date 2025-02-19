const SelectComponent = ({
  field,
  placeholder,
  options,
}: {
  field: any;
  placeholder: string;
  options: any[];
}) => {
  return (
    <select
      {...field}
      className="flex h-10 w-full rounded-md border-[1.5px] 
      px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground
      focus-visible:outline-none focus-visible:border-light-green 
      disabled:cursor-not-allowed disabled:opacity-50"
    >
      <option value="" disabled className="text-white">
        {placeholder}
      </option>
      {options.map((option) => (
        <option value={option} className="text-base">
          {option}
        </option>
      ))}
    </select>
  );
};

export default SelectComponent;
