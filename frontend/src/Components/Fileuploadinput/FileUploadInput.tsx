import classNames from 'classnames';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import images from '../../assets/index';
import { FileType } from './FileTypes';


/**
 * FileUploadInput component for uploading files.
 * @param {Object} props - Component props.
 * @param {number} props.maxSizeMB - Maximum allowed file size in megabytes.
 * @param {boolean} [props.required=false] - Whether the file upload is required.
 * @param {string} [props.title] - Title for the file upload component.
 * @param {string[]} [props.fileType] - Allowed file types.
 * @returns {JSX.Element} FileUploadInput component.
 */

interface FileUploadInputProps {
    maxSizeMB: number;
    required?: boolean;
    title?: string;
    fileDescription?: string
    fileType?: FileType[]
}

const FileUploadInput: React.FC<FileUploadInputProps> = ({ maxSizeMB, title, fileDescription, required = false, fileType = [] }) => {

    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string>('');
    const [dragging, setDragging] = useState<boolean>(false);
    const [uploaded, setUploaded] = useState<boolean>(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (!selectedFile) {
            return;
        }
        if (selectedFile.size > maxSizeMB * 1024 * 1024) {
            setError(`File size exceeds ${maxSizeMB}MB.`);
            setFile(null);
            return;
        }
        if (fileType.length && !fileType.includes(selectedFile.type as FileType)) {
            setError(`File type not allowed: ${selectedFile.type}`);
            setFile(null);
            return;
        }
        setError('');
        setFile(selectedFile);
        setUploaded(true);
    };

    const handleCancel = () => {
        setFile(null);
        setError('');
        setUploaded(false);
    };

    const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragging(false);
        const selectedFile = event.dataTransfer.files?.[0];
        if (selectedFile) {
            handleChange({
                target: {
                    files: [selectedFile],
                },
            } as unknown as React.ChangeEvent<HTMLInputElement>);
        }
    };

    const inputId = `file-upload-${uuidv4()}`;

    return (
        <div
            className={classNames('border-[2px] border-slate-300 border-dashed rounded-2xl p-4 px-8 my-2.5', {
                'dragging-over': dragging,
                'border-green-800': uploaded
            })}
            onDragOver={handleDragEnter}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <h3 className='text-[14px]'>{title}</h3>
            <div className={classNames('self-stretch p-4 px-8 rounded-xl border-2 border-slate-300 border-dashed justify-start items-center gap-4', {
                'bg-lime-50': file,
                'bg-gray-100': !file,
                'border-gray-500 border-[5px]': dragging,
            })}>
                <div className={classNames('items-center gap-2 flex', { 'justify-center': !file })}>
                    <div className={classNames('w-8 h-8 rounded-lg justify-center items-center gap-2.5 flex', { 'bg-lime-200': file })}>
                        <div className="w-6 h-6 justify-center items-center flex">
                            <div className="w-6 h-6 relative flex-col justify-start items-start flex">
                                {file && (
                                    <div className="flex items-center">
                                        <img src={images.Picture} alt='picture icon' />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    {!file && <img src={images.Upload} className="w-6 h-6" alt="Upload Icon" />}
                    <div className='w-[100%] flex justify-between'>
                        <label htmlFor={inputId} className="cursor-pointer" >
                            <div className="flex-col justify-center items-start gap-1 inline-flex">
                                <div className="text-zinc-950 text-[16px] font-bold leading-[14px]">
                                    {file ? file.name : <h3 className='text-gray-400 font-semi-bold '>Drag and drop or <span className='text-green-500'>browse</span></h3>}
                                </div>
                                <div className="text-slate-400 text-xs font-normal leading-3">
                                    {file ? `${(file.size / 1024).toFixed(2)} KB` : ''}
                                </div>
                            </div>
                        </label>
                        {file && (
                            <button type="button" onClick={handleCancel}>
                                <img src={images.Cancelicon} alt='cancel icon' />
                            </button>
                        )}
                    </div>
                    <input
                        id={inputId}
                        type="file"
                        className="hidden"
                        onChange={handleChange}
                        required={required}
                        accept={fileType.length ? fileType.join(',') : undefined}
                    />
                </div>
            </div>
            {error && <span className="text-red-500 text-sm">{error}</span>}
            <p className='text-[12px] text-gray-400'>{fileDescription}</p>
            <div className='text-[12px] text-gray-400'>{`Maximum file size: ${maxSizeMB}MB`}</div>
        </div>
    );
};

export default FileUploadInput;