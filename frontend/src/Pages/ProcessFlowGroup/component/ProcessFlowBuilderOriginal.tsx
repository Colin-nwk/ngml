// /* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { Heading } from '@/Components';
import { useCreateProcessFlowMutation, useGetProcessFlowsQuery } from '@/Redux/Features/ProcessFlow/processFlowService';
import { useGetRoutesQuery } from '@/Redux/Features/RouteBuilder/routeService';
import { useGetDepartmentsQuery } from '@/Redux/Features/UserSettings/departmentService';
import { useGetDesignationsQuery } from '@/Redux/Features/UserSettings/designationService';
import { useGetLocationsQuery } from '@/Redux/Features/UserSettings/locationService';
import { useGetUnitsQuery } from '@/Redux/Features/UserSettings/unitService';
import { resetProcessFlowIds } from '@/Utils/resetProcessFlowIds';
import React, { useCallback, useEffect, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { CiSaveDown2 } from 'react-icons/ci';
import { MdOutlineLibraryAdd } from 'react-icons/md';
import { VscSend } from 'react-icons/vsc';
import { toast } from 'react-toastify';
import { Frequency, FrequencyFor, ProcessFlow, ProcessFlowStep, StepType, UserType } from './types';



const ItemTypes = {
    PROCESS_FLOW: 'processFlow',
    PROCESS_FLOW_STEP: 'processFlowStep',
};

const frequencyOptions: Frequency[] = ['daily', 'weekly', 'hourly', 'monthly', 'yearly', 'none'];
const frequencyForOptions: FrequencyFor[] = ['users', 'customers', 'suppliers', 'contractors', 'none'];
const stepTypeOptions: StepType[] = ['create', 'delete', 'update', 'approve_auto_assign', 'approve_manual_assign'];
const userTypeOptions: UserType[] = ['user', 'supplier', 'customer', 'contractor'];
const booleanOptions = [true, false];

const dayOptions = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'None'];
const weekOptions = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'none'];


const getOptionsForField = (fieldName: string) => {
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

        default:
            return null;
    }
};

const DraggableItem = ({ type, name }: { type: string; name: string }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type,
        item: { name },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={drag}
            className={`p-2 mb-2 text-[14px] bg-white rounded-[6px] cursor-move ${isDragging ? 'opacity-50' : ''}`}
        >
            {name}
        </div>
    );
};
const DraggableStep = ({ step, index, moveStep, updateStep, deleteStep }: { step: ProcessFlowStep, index: number, moveStep: (dragIndex: number, hoverIndex: number) => void, updateStep: (updatedItem: ProcessFlow | ProcessFlowStep) => void, deleteStep: (id: number) => void }) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const [{ handlerId }, drop] = useDrop<unknown, void, { handlerId: string | symbol | null }>(() => ({
        accept: ItemTypes.PROCESS_FLOW_STEP,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item: unknown) {
            if (!ref.current) {
                return;
            }
            const dragItem = item as { type: string; id: number; index: number };
            const dragIndex = dragItem.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            moveStep(dragIndex, hoverIndex);
            dragItem.index = hoverIndex;
        },
    }));

    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.PROCESS_FLOW_STEP,
        item: () => {
            return { id: step.id, index, isExistingStep: true };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0.4 : 1;
    drag(drop(ref));

    return (
        <div ref={ref} style={{ opacity }} data-handler-id={handlerId}>
            <EditableContent
                item={step}
                onUpdate={updateStep}
                onDelete={() => deleteStep(step.id)}
                isStep={true}
                stepIndex={index + 1}
            />
        </div>
    );
}


const EditableContent = ({
    item,
    onUpdate,
    onDelete,
    isStep = false,
    stepIndex,

}: {
    item: ProcessFlow | ProcessFlowStep;
    onUpdate: (updatedItem: ProcessFlow | ProcessFlowStep) => void;
    onDelete: () => void;
    isStep?: boolean;
    stepIndex?: number;
    steps?: ProcessFlowStep[];
    processFlow?: ProcessFlow | null;
}) => {
    const [editedItem, setEditedItem] = useState(item);
    const [isEditing, setIsEditing] = useState(false);

    const { data: routes } = useGetRoutesQuery();
    const { data: departments } = useGetDepartmentsQuery();
    const { data: locations } = useGetLocationsQuery();
    const { data: units } = useGetUnitsQuery();
    const { data: designations } = useGetDesignationsQuery();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditedItem({ ...editedItem, [name]: value });
    };

    const handleSave = () => {
        onUpdate(editedItem);
        setIsEditing(false);
    };

    const renderField = (key: string, value: any) => {



        if (key === 'id' || key === 'created_at' || key === 'updated_at' || key === 'steps' || key === 'process_flow_id' || key === 'start_step_id' || key === 'next_step_id') return null;

        if (key === 'name') {
            return (
                <>
                    <label htmlFor={key} className="block text-sm font-medium text-gray-700 capitalize">{key.replace(/_/g, ' ')}</label>
                    <input
                        id={key}
                        type="text"
                        name={key}
                        value={value as string}
                        onChange={handleInputChange}
                        className="mt-1 block w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-nnpc-200 focus:border-nnpc-200 p-2.5"
                    />
                </>
            );
        }
        if (key === 'start_user_designation' || key === 'next_user_designation') {
            return (
                <>
                    <label htmlFor={key} className="block text-sm font-medium text-gray-700 capitalize">
                        {key.replace(/_/g, ' ')}
                    </label>
                    <select
                        id={key}
                        name={key}
                        value={value || ''}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-nnpc-200 focus:nnpc-300 p-2.5"
                    >
                        <option value="">Select a designation</option>
                        {Array.isArray(designations?.data) && designations?.data?.map((designation) => (
                            <option key={designation.id} value={designation.id}>
                                {designation.role}
                            </option>
                        ))}
                    </select>
                </>
            );
        }

        if (key === 'start_user_department' || key === 'next_user_department') {
            return (
                <>
                    <label htmlFor={key} className="block text-sm font-medium text-gray-700 capitalize">
                        {key.replace(/_/g, ' ')}
                    </label>
                    <select
                        id={key}
                        name={key}
                        value={value || ''}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-nnpc-200 focus:nnpc-300 p-2.5"
                    >
                        <option value="">Select a department</option>
                        {Array.isArray(departments?.data) && departments?.data?.map((department) => (
                            <option key={department.id} value={department.id}>
                                {department.name}
                            </option>
                        ))}
                    </select>
                </>
            );
        }

        if (key === 'next_user_location') {
            return (
                <>
                    <label htmlFor={key} className="block text-sm font-medium text-gray-700 capitalize">
                        {key.replace(/_/g, ' ')}
                    </label>
                    <select
                        id={key}
                        name={key}
                        value={value || ''}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-nnpc-200 focus:nnpc-300 p-2.5"
                    >
                        <option value="">Select a department</option>
                        {Array.isArray(locations?.data) && locations?.data?.map((location) => (
                            <option key={location.id} value={location.id}>
                                {location.location}
                            </option>
                        ))}
                    </select>
                </>
            );
        }

        if (key === 'start_user_unit' || key === 'next_user_unit') {
            return (
                <>
                    <label htmlFor={key} className="block text-sm font-medium text-gray-700 capitalize">
                        {key.replace(/_/g, ' ')}
                    </label>
                    <select
                        id={key}
                        name={key}
                        value={value || ''}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-nnpc-200 focus:nnpc-300 p-2.5"
                    >
                        <option value="">Select a department</option>
                        {Array.isArray(units?.data) && units?.data?.map((unit) => (
                            <option key={unit.id} value={unit.id}>
                                {unit.name}
                            </option>
                        ))}
                    </select>
                </>
            );
        }


        if (key === 'step_route' || key === 'assignee_user_route') {
            return (
                <>
                    <label htmlFor={key} className="block text-sm font-medium text-gray-700 capitalize">
                        {key.replace(/_/g, ' ')}
                    </label>
                    <select
                        id={key}
                        name={key}
                        value={value || ''}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-nnpc-200 focus:nnpc-300 p-2.5"
                    >
                        <option value="">Select a route</option>
                        {routes?.data && routes?.data?.map((route) => (
                            <option key={route.id} value={route.id}>
                                {route.name}
                            </option>
                        ))}
                    </select>
                </>
            );
        }

        const options = getOptionsForField(key);
        if (options) {
            return (
                <>
                    <label htmlFor={key} className="block text-sm font-medium text-gray-700 capitalize">{key.replace(/_/g, ' ')}</label>
                    <select
                        id={key}
                        name={key}
                        value={value as string}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-nnpc-200 focus:border-nnpc-300 p-2.5 "
                    >
                        {options.map((option) => (
                            <option key={option.toString()} value={option.toString()}>
                                {option.toString()}
                            </option>
                        ))}
                    </select>
                </>
            );
        }

        return (
            <>
                <label htmlFor={key} className="block text-sm font-medium text-gray-700 capitalize">{key.replace(/_/g, ' ')}</label>
                <input
                    id={key}
                    type="text"
                    name={key}
                    value={value as string}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-nnpc-200 focus:ring focus:ring-nnpc-300 focus:ring-opacity-50"
                />
            </>
        );
    };

    return (
        <div className="bg-white p-4 rounded-lg  mb-4" >
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">
                    {isStep ? `Step ${stepIndex}: ${item.name}` : item.name}
                </h3>
                <div>
                    <button type='button'
                        onClick={() => setIsEditing(!isEditing)}
                        className="px-4 py-1 text-[14px] bg-nnpc-200 text-white rounded hover:bg-nnpc-300 mr-2"
                    >
                        {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                    <button
                        type='button'
                        onClick={onDelete}
                        className="px-4 py-1 text-[14px] bg-nnpc-800/70 text-white rounded hover:bg-nnpc-800"
                    >
                        Delete
                    </button>
                </div>
            </div>
            {isEditing && (
                <>


                    {Object.entries(editedItem).map(([key, value]) => (
                        <div key={key} className="mb-2">
                            {/* <label className="block text-sm font-medium text-gray-700 capitalize">{key.replace(/_/g, ' ')}</label> */}
                            {renderField(key, value)}
                        </div>
                    ))}
                    <button
                        type='button'
                        onClick={handleSave}
                        className="mt-2 px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        Save
                    </button>
                </>
            )
            }
        </div >
    );
};

const ProcessFlowBuilder = () => {
    const [processFlows, setProcessFlows] = useState<ProcessFlow[]>([]);
    const [selectedFlow, setSelectedFlow] = useState<ProcessFlow | null>(null);
    const [steps, setSteps] = useState<ProcessFlowStep[]>([]);

    const [submit, { isLoading: submitLoading }] =
        useCreateProcessFlowMutation();

    useEffect(() => {
        const savedFlows = localStorage.getItem('processFlows');
        if (savedFlows) {
            setProcessFlows(JSON.parse(savedFlows));
        }
    }, []);
    const moveStep = useCallback((dragIndex: number, hoverIndex: number) => {
        setSteps((prevSteps) => {
            const newSteps = [...prevSteps];
            const [reorderedStep] = newSteps.splice(dragIndex, 1);
            newSteps.splice(hoverIndex, 0, reorderedStep);

            // Update next_step_id references
            newSteps.forEach((step, index) => {
                if (index < newSteps.length - 1) {
                    step.next_step_id = newSteps[index + 1].id;
                } else {
                    step.next_step_id = null;
                }
            });

            // Update start_step_id if necessary
            if (selectedFlow && (dragIndex === 0 || hoverIndex === 0)) {
                setSelectedFlow(prevFlow => ({
                    ...prevFlow!,
                    start_step_id: newSteps[0].id
                }));
            }

            return newSteps;
        });
    }, [selectedFlow]);

    const [, drop] = useDrop(() => ({
        accept: [ItemTypes.PROCESS_FLOW, ItemTypes.PROCESS_FLOW_STEP],
        drop: (item: { name: string; isExistingStep?: boolean }, monitor) => {
            const itemType = monitor.getItemType() as string;
            if (itemType === ItemTypes.PROCESS_FLOW && !selectedFlow) {
                const newProcessFlow: ProcessFlow = {
                    id: Date.now(),
                    name: item.name,
                    start_step_id: null,
                    start_user_unit: null,
                    start_user_department: null,
                    start_user_designation: null,
                    frequency: 'none',
                    status: true,
                    frequency_for: 'none',
                    day: 'none',
                    week: 'none',
                };
                setSelectedFlow(newProcessFlow);
                setSteps([]);
            } else if (itemType === ItemTypes.PROCESS_FLOW_STEP && !item.isExistingStep) {
                const newStep: ProcessFlowStep = {
                    id: Date.now(),
                    name: item.name,
                    step_route: '',
                    assignee_user_route: '',
                    next_user_designation: null,
                    next_user_department: null,
                    next_user_unit: null,
                    process_flow_id: null,
                    next_user_location: null,
                    step_type: 'approve_auto_assign',
                    user_type: 'user',
                    next_step_id: null,
                    status: true,
                };
                setSteps(prevSteps => {
                    const updatedSteps = [...prevSteps, newStep];
                    if (prevSteps.length > 0) {
                        const lastStep = prevSteps[prevSteps.length - 1];
                        lastStep.next_step_id = newStep.id;
                    } else if (selectedFlow) {
                        setSelectedFlow({ ...selectedFlow, start_step_id: newStep.id });
                    }
                    return updatedSteps;
                });
            }
        },
    }));

    const handleUpdateProcessFlow = (updatedFlow: ProcessFlow | ProcessFlowStep) => {
        setSelectedFlow(updatedFlow as ProcessFlow);
    };



    const handleUpdateStep = (updatedItem: ProcessFlow | ProcessFlowStep) => {
        if ('step_route' in updatedItem) {
            setSteps(steps.map((step) => (step.id === updatedItem.id ? updatedItem as ProcessFlowStep : step)));
        }
    };

    const handleDeleteProcessFlow = () => {
        if (selectedFlow) {
            const updatedFlows = processFlows.filter(flow => flow.id !== selectedFlow.id);
            setProcessFlows(updatedFlows);
            localStorage.setItem('processFlows', JSON.stringify(updatedFlows));
            setSelectedFlow(null);
            setSteps([]);
        }
    };


    const handleDeleteStep = (stepId: number) => {
        setSteps(prevSteps => {
            const stepIndex = prevSteps.findIndex(step => step.id === stepId);
            if (stepIndex === -1) return prevSteps;
            const newSteps = prevSteps.filter((step) => step.id !== stepId);

            if (stepIndex > 0) {
                newSteps[stepIndex - 1].next_step_id = stepIndex < prevSteps.length - 1 ? prevSteps[stepIndex + 1].id : null;
            } else if (selectedFlow && selectedFlow.start_step_id === stepId) {
                setSelectedFlow({ ...selectedFlow, start_step_id: newSteps.length > 0 ? newSteps[0].id : null });
            }
            return newSteps;
        });
    };

    const handleSaveProcessFlow = () => {
        if (selectedFlow) {
            const updatedFlows = processFlows.map(flow =>
                flow.id === selectedFlow.id ? { ...selectedFlow, steps } : flow
            );
            if (!processFlows.some(flow => flow.id === selectedFlow.id)) {
                updatedFlows.push({ ...selectedFlow, steps });
            }
            setProcessFlows(updatedFlows);
            localStorage.setItem('processFlows', JSON.stringify(updatedFlows));
            handleCreateNewFlow()
            toast.info('Process Flow saved successfully!');
        } else {
            toast.info('No Process Flow to save!');
        }
    };

    const handleSelectFlow = (flow: ProcessFlow) => {
        setSelectedFlow(flow);
        setSteps(flow.steps || []);
    };

    const handleCreateNewFlow = () => {
        setSelectedFlow(null);
        setSteps([]);
    };



    const { data: backendProcessflows } = useGetProcessFlowsQuery();




    const handleSubmitToBackend = async () => {
        if (selectedFlow) {
            // Clone the selectedFlow and include steps explicitly if not already included
            const formattedProcessFlow = {
                ...selectedFlow,
                steps: steps.map(step => ({
                    ...step,
                    // Ensure all necessary step fields are included here
                }))
            };

            const processedFlow = resetProcessFlowIds(formattedProcessFlow);
            // const finalProcessFlow = setDefaultUserProperties(processedFlow);

            console.log('Submitting Process Flow:', processedFlow);

            try {
                const response = await submit(processedFlow).unwrap();
                toast.success('Process flow created successfully!');
                handleCreateNewFlow()
                console.log('Submission Response:', response);
            } catch (error) {
                console.error('Error submitting the process flow:', error);
                // toast.error('Error creating the process flow');
            }
        } else {
            toast.info('No Process Flow selected for submission');
        }
    };


    return (
        <div className="flex flex-col h-full w-[100%]">
            <div className="w-full flex-shrink-0 p-4 flex justify-between items-center rounded-[6px] mb-4" >
                <Heading size="h5" className='text-nnpcmediumgreen-950 text-center'>Process Flow Builder</Heading>
                <div className='gap-3 flex'>
                    <button
                        type='button'
                        onClick={handleCreateNewFlow}
                        className="px-4 py-2 text-[14px] rounded-md border flex items-center justify-center gap-1 bg-white font-[500] border-nnpc-200 text-nnpc-300 hover:text-white  hover:bg-nnpc-300 duration-300 ease-out transition-all"
                    >
                        <MdOutlineLibraryAdd />
                        Reset
                    </button>
                    <button
                        type='button'
                        onClick={handleSaveProcessFlow}
                        className="px-4 py-2 text-[14px] border flex items-center justify-center gap-1 bg-white font-[500] border-nnpc-200 text-nnpc-300 hover:text-white rounded-md hover:bg-nnpc-300 duration-300 ease-out transition-all"
                    >
                        <CiSaveDown2 />
                        Save
                    </button>
                    <button
                        type='button'
                        onClick={handleSubmitToBackend}
                        className="px-4 py-2 text-[14px] border flex items-center justify-center gap-1 bg-nnpc-200 font-[500] text-[white] hover:text-white rounded-md hover:bg-nnpc-300 duration-300 ease-out transition-all"
                    >
                        <VscSend />
                        {submitLoading ? 'Creating' : 'Create'}
                    </button>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                <div className="w-1/4 bg-[#F5F7F9] p-4 overflow-y-auto rounded-xl mr-4 h-fit">
                    <h2 className="text-[16px] font-bold mb-1 text-[#2D6844]">Flow Items</h2>
                    {!selectedFlow && <DraggableItem type={ItemTypes.PROCESS_FLOW} name="Process Flow" />}
                    <DraggableItem type={ItemTypes.PROCESS_FLOW_STEP} name="Process Flow Step" />

                    {/* Scrollable list of saved process flows */}
                    <h3 className="text-[16px] font-bold mt-6 text-[#2D6844] ">Saved Process Flows</h3>
                    <div className="overflow-y-auto max-h-40">
                        {processFlows.map(flow => (
                            <div
                                key={flow.id}
                                className="cursor-pointer p-2 mt-1 text-[14px] bg-white rounded-[6px]"
                                onClick={() => handleSelectFlow(flow)}
                            >
                                {flow.name}
                            </div>
                        ))}
                    </div>
                    <h3 className="text-[16px] font-bold mt-6 text-[#2D6844]">Created Process flow</h3>
                    <div className="overflow-y-auto max-h-40 mt-1">
                        {backendProcessflows?.data && backendProcessflows?.data?.map((flow: any) => (
                            <div
                                key={flow.id}
                                className="cursor-pointer p-2 mt-2 text-[14px] bg-white rounded-[6px]"
                                onClick={() => handleSelectFlow(flow)}
                            >
                                {flow.name}
                            </div>
                        ))}
                    </div>
                </div>

                <div ref={drop} className="w-3/4 bg-[#F5F7F9] p-4 overflow-y-scroll rounded-xl h-[30rem]">
                    {selectedFlow && (
                        <>
                            <h3 className="text-lg font-semibold mb-2">Process Flow</h3>
                            <EditableContent
                                item={selectedFlow}
                                onUpdate={handleUpdateProcessFlow}
                                onDelete={handleDeleteProcessFlow}
                                steps={steps}
                            />
                        </>
                    )}
                    {steps.length > 0 && (
                        <>
                            <h3 className="text-lg font-semibold mb-2">Steps</h3>
                            {steps.map((step, index) => (
                                <DraggableStep
                                    key={step.id}
                                    step={step}
                                    index={index}
                                    moveStep={moveStep}
                                    updateStep={handleUpdateStep}
                                    deleteStep={handleDeleteStep}
                                />
                            ))}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProcessFlowBuilder;
