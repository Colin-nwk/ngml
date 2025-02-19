/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ProcessFlow, ProcessFlowStep } from '@/Pages/ProcessFlowGroup/component/types';
export function resetProcessFlowIds(processFlow: ProcessFlow): ProcessFlow {
  const resetFlow = { ...processFlow };

  // Helper function to remove all `id`-related properties
  function removeIdProps<T extends object>(obj: T): T {
    const newObj = { ...obj };
    for (const key in newObj) {
      if (Object.prototype.hasOwnProperty.call(newObj, key) && (key.endsWith('_id') || key === 'id')) {
        delete (newObj as any)[key];
      }
    }
    return newObj;
  }

  // Remove id properties in the main process flow object
  removeIdProps(resetFlow);

  // Remove id properties in each step, if steps exist
  if (Array.isArray(resetFlow.steps)) {
    resetFlow.steps = resetFlow.steps.map((step: ProcessFlowStep) => removeIdProps(step));
  } else {
    resetFlow.steps = [];
  }

  return resetFlow;
}


export function setDefaultUserProperties(processFlow: ProcessFlow): ProcessFlow {
  // Clone the processFlow to avoid directly mutating the input object
  const updatedFlow = { ...processFlow };

  // Delete specified properties from the main processFlow object
  delete updatedFlow.start_user_unit;
  delete updatedFlow.start_user_department;
  delete updatedFlow.start_user_designation;

  if (Array.isArray(updatedFlow.steps)) {
    updatedFlow.steps = updatedFlow.steps.map((step: ProcessFlowStep) => ({
      ...step,
      assignee_user_route: '1',
      next_user_designation: null,
      next_user_department: null,
      next_user_unit: null,
      next_user_location: null
    }));
  }

  return updatedFlow;
}
