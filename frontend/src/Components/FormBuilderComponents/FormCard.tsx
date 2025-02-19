import { FaEdit } from 'react-icons/fa';
import { Button } from './ButtonComponent';


const FormCard = ({
  formName,
  formDescription,
  // formId,
}: {
  formName: string;
  formDescription: string;
}) => {


  return (
    <div className="w-full bg-white px-3 py-4 md:px-6 border-[1.5px] border-dark-green/20  md:h-[150px] items-center justify-center flex flex-col border-dashed gap-4 rounded-lg">
      <div className="flex flex-col items-start justify-between w-full space-y-3 md:flex-row">
        <div className="flex flex-col md:space-y-1">
          <b className="text-base">{formName}</b>
          <span className="text-sm text-gray-600">{formDescription}</span>
        </div>

      </div>
      <div className="flex flex-col w-full">
        <Button
          type="submit"
          className="w-full gap-2 font-semibold font-base"
        // onClick={openForm}
        >
          Edit form
          <FaEdit />
        </Button>
      </div>
    </div>
  );
};

export default FormCard;
