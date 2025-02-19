

import { FormField } from '@/Redux/Features/FormBuilder/formBuilderService';

type FormData = {
    [key: string]: string | File | null;
};

export const areRequiredFieldsFilled = (formFields: FormField[], formData: FormData): boolean => {
    return formFields.every(field => {
        if (field.required) {
            const value = formData[field.name ?? ''];
            if (field.type === 'file') {
                return value instanceof File;
            } else {
                return value !== '' && value !== null && value !== undefined;
            }
        }
        return true;
    });
};

// import { FormField } from '@/Redux/Features/FormBuilder/formBuilderService';

// type FormData = {
//     [key: string]: string | File | null;
// };

// export type TouchedFields = {
//     [key: string]: boolean;
// };

// export const areRequiredFieldsFilled = (
//     formFields: FormField[],
//     formData: FormData,
//     touchedFields: TouchedFields
// ): { isValid: boolean; invalidFields: string[] } => {
//     const invalidFields: string[] = [];

//     const isValid = formFields.every(field => {
//         if (field.required && touchedFields[field.name ?? '']) {
//             const value = formData[field.name ?? ''];
//             let isFieldValid: boolean;

//             if (field.type === 'file') {
//                 isFieldValid = value instanceof File;
//             } else {
//                 isFieldValid = value !== '' && value !== null && value !== undefined;
//             }

//             if (!isFieldValid) {
//                 invalidFields.push(field.name ?? '');
//             }

//             return isFieldValid;
//         }
//         return true;
//     });

//     return { isValid, invalidFields };
// };

// export const updateTouchedFields = (
//     fieldName: string,
//     touchedFields: TouchedFields
// ): TouchedFields => {
//     return {
//         ...touchedFields,
//         [fieldName]: true
//     };
// };