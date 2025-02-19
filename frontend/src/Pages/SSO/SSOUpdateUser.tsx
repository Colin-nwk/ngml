import { useUserInfoMutation } from '@/Redux/Features/Auth/ssoAuthService';
import { Department, useGetDepartmentsQuery } from '@/Redux/Features/UserSettings/departmentService';
import { Designation, useGetDesignationsQuery } from '@/Redux/Features/UserSettings/designationService';
import { Location, useGetLocationsQuery } from '@/Redux/Features/UserSettings/locationService';
import { Unit, useGetUnitsQuery } from '@/Redux/Features/UserSettings/unitService';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useSelector } from 'react-redux';

import { selectCurrentUser } from '@/Redux/Features/Auth/authSlice';
import {
    AuthContainer,
    Button,
    ContentContainer,
    CustomInput,
} from '../../Components';
import images from '../../assets';
import '../../index.css';

interface FormData {
    location: string;
    designation: string;
    unit: string;
    department: string;
}

type DataType = Designation | Location | Unit | Department;

function isDataArray<T>(data: T | T[]): data is T[] {
    return Array.isArray(data);
}

function transformToOptions<T extends DataType>(
    data: T | T[] | undefined,
    labelKey: keyof T
): Array<{ label: string; value: string }> {
    if (!data) return [];

    const items = isDataArray(data) ? data : [data];
    return items.map(item => ({
        label: String(item[labelKey]),
        value: item.id?.toString() ?? ''
    }));
}

const SSOUpdateUser: React.FC = () => {

    const user = useSelector(selectCurrentUser);
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        location: '',
        designation: '',
        unit: '',
        department: ''
    });

    // Fetch data with loading and error states
    const { data: designations, isLoading: isLoadingDesignations, isError: designationError } = useGetDesignationsQuery();
    const { data: locations, isLoading: isLoadingLocations, isError: locationError } = useGetLocationsQuery();
    const { data: units, isLoading: isLoadingUnits, isError: unitError } = useGetUnitsQuery();
    const { data: departments, isLoading: isLoadingDepartment, isError: departmentError } = useGetDepartmentsQuery();

    //mutation
    const [updateUserInfo, { isLoading: updateLoading }] = useUserInfoMutation()

    // Transform data to options
    const designationOptions = transformToOptions(designations?.data, 'role');
    const locationOptions = transformToOptions(locations?.data, 'location');
    const unitOptions = transformToOptions(units?.data, 'name');
    const departmentOptions = transformToOptions(departments?.data, 'name')

    const isLoading = isLoadingDesignations || isLoadingLocations || isLoadingUnits || isLoadingDepartment;
    const hasError = designationError || locationError || unitError || departmentError;

    const handleChange = (key: keyof FormData) => (value: string) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const isFormValid = () => {
        return Object.values(formData).every(value => value.trim() !== '');
    };

    const handleSubmit = async () => {
        try {
            // if (!isFormValid()) {
            //     toast.error('Please fill in all fields');
            //     return;
            // }
            console.log

            await updateUserInfo({
                location_id: formData.location,
                unit_id: formData.unit,
                department_id: formData.department,
                designation_id: formData.designation,
                user_id: user.id

            }).unwrap();
            toast.success('User information updated successfully');
            navigate('/admin');
        } catch (error) {
            // toast.error('Failed to update user information');
            console.error('Update failed:', error);
        }
    };

    const inputFields = [
        { key: 'location' as const, options: locationOptions, placeholder: 'Select location' },
        { key: 'unit' as const, options: unitOptions, placeholder: 'Select unit' },
        { key: 'designation' as const, options: designationOptions, placeholder: 'Select Designation' },
        { key: 'department' as const, options: departmentOptions, placeholder: 'Select Department' },
    ];

    return (
        <div className="min-h-screen flex flex-col logingradient-bg w-full">
            <ToastContainer />
            <main className="flex flex-col items-center justify-center flex-1 p-10 mb-6">
                <div className="w-full">
                    <AuthContainer>
                        <h1 className="text-[12px] md:text-[18px] font-semibold text-white">
                            Update Your Info
                        </h1>
                        {isLoading && <span>loading....</span>}
                        {hasError && (
                            <div className="text-red-500 text-sm mb-4">
                                Error loading data. Please try again later.
                            </div>
                        )}
                        <div className="w-full mt-2">
                            <div className="mx-auto space-y-4">
                                {inputFields.map(({ key, options, placeholder }) => (
                                    <CustomInput
                                        key={key}
                                        type="select"
                                        options={options}
                                        value={formData[key]}
                                        handleChangeEvent={handleChange(key)}
                                        placeholder={placeholder}
                                        styleVariant="customStyle1"
                                        icon={<img src={images.email} alt={key} />}
                                    // disabled={isLoading}
                                    />
                                ))}
                            </div>
                            <div className="flex items-center justify-center mt-4">
                                <Button
                                    type="primary"
                                    label="Update"
                                    action={handleSubmit}
                                    color="#FFFFFF"
                                    width="100%"
                                    height="48px"
                                    fontSize="16px"
                                    radius="32px"
                                    disabled={isLoading || !isFormValid() || updateLoading}
                                />
                            </div>
                        </div>
                    </AuthContainer>
                </div>
            </main>
            <footer className="mb-6 mx-6">
                <ContentContainer
                    type="translucent"
                    width="100%"
                    height="30px"
                    borderRadius={32}
                >
                    <div className="flex items-center justify-center w-full h-full">
                        <p className="text-center text-[8px] md:text-[10px] text-[#E3EADA]">
                            This Portal is a Property of NNPC Gas Marketing Limited
                        </p>
                    </div>
                </ContentContainer>
            </footer>
        </div>
    );
};

export default SSOUpdateUser;