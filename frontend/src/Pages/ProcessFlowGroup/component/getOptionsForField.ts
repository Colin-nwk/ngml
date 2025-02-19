

import { Frequency, FrequencyFor, StepType, UserType } from './types';



const frequencyOptions: Frequency[] = ['daily', 'weekly', 'hourly', 'monthly', 'yearly', 'none'];
const frequencyForOptions: FrequencyFor[] = ['users', 'customers', 'suppliers', 'contractors', 'none'];
const stepTypeOptions: StepType[] = ['create', 'delete', 'update', 'approve_auto_assign', 'approve_manual_assign'];
const userTypeOptions: UserType[] = ['user', 'supplier', 'customer', 'contractor'];
const booleanOptions = [true, false];

const dayOptions = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const weekOptions = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
const designationOptions = ['Manager', 'Developer', 'Analyst', 'Designer'];
const unitOptions = ['Unit A', 'Unit B', 'Unit C'];
const departmentOptions = ['HR', 'Engineering', 'Finance', 'Sales'];

export const getOptionsForField = (fieldName: string) => {
    switch (fieldName) {
        case 'frequency':
            return frequencyOptions;
        case 'frequency_for':
            return frequencyForOptions;
        case 'step_type':
            return stepTypeOptions;
        case 'user_type':
            return userTypeOptions;
        case 'status':
            return booleanOptions;
        case 'day':
            return dayOptions;
        case 'week':
            return weekOptions;
        case 'next_user_designation':
            return designationOptions;
        case 'next_user_unit':
            return unitOptions;
        case 'next_user_department':
            return departmentOptions;
        default:
            return null;
    }
};

