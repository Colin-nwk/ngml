import { FileUploadInput } from '@/Components';
import colors from '@/Utils/colors';

/**
 * SupplierRegistrationUpload component responsible for rendering the document uploads section for suppliers.
 * This component imports and utilizes the `FileUploadInput` for handling file uploads.
 * 
 * @component
 * @example
 * return (
 *   <SupplierRegistrationUpload />
 * )
 */

const SupplierRegistrationUpload = () => {
    return (
        <div className="p-[20px] rounded-[20px]" style={{ background: colors.dark[50] }}>
            <h3 className='text-[#49526A] font-[700]'>DOCUMENT UPLOADS</h3>
            <div className='mt-[20px]'>
                <FileUploadInput
                    title='GSA Agreement'
                    fileDescription='Scan the copy of your original document (pdf,png,jpg)'
                    maxSizeMB={25}
                />
            </div>
            <div className='mt-[30px]'>
                <FileUploadInput
                    title='Entry and Exit agreement'
                    fileDescription='Scan the copy of your original document (pdf,png,jpg)'
                    maxSizeMB={25}
                />
            </div>
        </div>
    )
}

export default SupplierRegistrationUpload;