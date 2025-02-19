import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Field {
  id: string;
  name: string;
  value: string;
}

interface RouteStep {
  id: string;
  fields: Field[];
}

interface RouteBuilderState {
  steps: RouteStep[];
}

const initialState: RouteBuilderState = {
  steps: [],
};

const routeBuilderSlice = createSlice({
  name: 'routeBuilder',
  initialState,
  reducers: {
    addStep: (state) => {
      const newStep: RouteStep = {
        id: Date.now().toString(),
        fields: [
          { id: 'name', name: 'Name', value: '' },
          { id: 'address', name: 'Address', value: '' },
        ],
      };
      state.steps.push(newStep);
    },
    updateField: (state, action: PayloadAction<{ stepId: string; fieldId: string; value: string }>) => {
      const { stepId, fieldId, value } = action.payload;
      const step = state.steps.find(s => s.id === stepId);
      if (step) {
        const field = step.fields.find(f => f.id === fieldId);
        if (field) {
          field.value = value;
        }
      }
    },
    addFieldToStep: (state, action: PayloadAction<{ stepId: string; fieldName: string }>) => {
      const { stepId, fieldName } = action.payload;
      const step = state.steps.find(s => s.id === stepId);
      if (step) {
        step.fields.push({ id: Date.now().toString(), name: fieldName, value: '' });
      }
    },
    removeFieldFromStep: (state, action: PayloadAction<{ stepId: string; fieldId: string }>) => {
      const { stepId, fieldId } = action.payload;
      const step = state.steps.find(s => s.id === stepId);
      if (step) {
        step.fields = step.fields.filter(field => field.id !== fieldId);
      }
    },
    removeStep: (state, action: PayloadAction<string>) => {
      state.steps = state.steps.filter(step => step.id !== action.payload);
    },
  },
});

export const { addStep, updateField, addFieldToStep, removeFieldFromStep, removeStep } = routeBuilderSlice.actions;
export default routeBuilderSlice.reducer;