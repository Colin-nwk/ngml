/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button, Heading, Modal } from '@/Components';

import { useCreateUnitMutation, useDeleteUnitMutation, useGetUnitsQuery } from '@/Redux/Features/UserSettings/unitService';

import { useGetDepartmentsQuery } from '@/Redux/Features/UserSettings/departmentService';



import { useState } from 'react';
import { FaTrashCan } from 'react-icons/fa6';
import { VscSend } from 'react-icons/vsc';
import { toast } from 'react-toastify';

const Unit = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        departmentId: ''
    });
    const [deletingUnitId, setDeletingUnitId] = useState<number | null>(null);

    const handleChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const target = event.target;

        if (target instanceof HTMLInputElement && (target.type === 'checkbox' || target.type === 'radio')) {
            setFormData({ ...formData, [key]: target.checked });
        } else {
            setFormData({ ...formData, [key]: target.value });
        }
    };

    const { data, isLoading, isError } = useGetUnitsQuery();
    const { data: departmentlist } = useGetDepartmentsQuery();
    const [createUnit, { isLoading: creating }] = useCreateUnitMutation();
    const [deleteUnit] = useDeleteUnitMutation();


    // Handles creation of a new route
    const handleCreate = async () => {
        try {
            await createUnit(formData).unwrap();
            setIsModalOpen(false);
            toast.success('Unit created successfully');
            setFormData({ name: '', description: '', departmentId: '' });
        } catch (error) {
            console.error('Failed to create route:', error);
            // toast.error('Failed to create route');
        }
    };

    // Handles deletion of a route
    const handleDelete = async (id: number) => {
        setDeletingUnitId(id);
        try {
            alert(id)
            await deleteUnit(id).unwrap();
            toast.success('unit deleted successfully');
        } catch (error) {
            console.error('Failed to delete unit:', error);
        } finally {
            setDeletingUnitId(null);
        }
    };

    return (
        <div className="">

            <div className="flex flex-col h-full w-full bg-gray-100 p-6 rounded-xl mt-4">
                <div className="flex justify-between items-center mb-6">
                    <Heading size="h4" className="text-nnpcmediumgreen-950">Units</Heading>
                    <Button
                        type="secondary"
                        label="Create Unit"
                        action={() => setIsModalOpen(true)}
                        icon={<VscSend className="mr-2" />}
                        className="px-4 py-2 text-sm rounded-full"
                    />
                </div>

                <div className="bg-white rounded-xl p-6">
                    {/* <h2 className="text-2xl font-bold mb-4 text-nnpcmediumgreen-950">Existing</h2> */}
                    {isLoading && <p className="text-gray-600">Loading units...</p>}
                    {isError && <p className="text-red-500">Error loading unts</p>}
                    {Array.isArray(data?.data) && (
                        <div className="space-y-2">
                            {data.data.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300"
                                >
                                    <span className="capitalize font-medium text-gray-800">{item.name}</span>
                                    <Button
                                        type="tertiary"
                                        label={deletingUnitId === item.id ? 'Deleting...' : 'Delete'}
                                        action={() => item?.id !== undefined ? handleDelete(item.id) : undefined}
                                        icon={<FaTrashCan />}
                                        className="px-3 py-1 text-sm rounded-full space-x-2"
                                        disabled={deletingUnitId === item.id}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    size='medium'
                    title='Create Units'
                    subTitle='Add units to be used in user settings'
                    buttons={[
                        <div key="modal-buttons" className='flex gap-2 mb-[-10px]'>
                            <div className='w-[120px]'>
                                <Button
                                    action={() => setIsModalOpen(false)}
                                    className='rounded-full'
                                    type="outline"
                                    label="Cancel"
                                    color="#FFFFFF"
                                    width="100%"
                                    height="40px"
                                    fontSize="16px"
                                    radius="20px"
                                />
                            </div>
                            <div className='w-[260px]'>
                                <Button
                                    className='rounded-full'
                                    type="secondary"
                                    label={creating ? 'Creating...' : 'Create Unit'}
                                    action={handleCreate}
                                    color="#FFFFFF"
                                    width="100%"
                                    height="40px"
                                    fontSize="16px"
                                    radius="20px"
                                    disabled={creating}
                                />
                            </div>
                        </div>
                    ]}
                >
                    <div className="space-y-2">

                        <div className=''>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 capitalize"> Name</label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange('name')}
                                className="mt-1 block w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-nnpc-200 focus:border-nnpc-200 p-2.5"
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 capitalize">Description</label>
                            <input
                                id="description"
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleChange('description')}
                                className="mt-1 block w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-nnpc-200 focus:border-nnpc-200 p-2.5"
                            />
                        </div>

                        <div>

                            <label htmlFor="departmentId" className="block text-sm font-medium text-gray-700 capitalize">Department</label>
                            <select
                                id="departmentId"
                                name="departmentId"
                                value={formData.departmentId}
                                onChange={handleChange('departmentId')}
                                className="mt-1 block w-full rounded-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-nnpc-200 focus:border-nnpc-200 p-2.5"
                            >


                                <option>Select a department</option>

                                {Array.isArray(departmentlist?.data) && departmentlist.data.map((department) => (
                                    <option key={department.id} value={department.id}>
                                        {department.name.replace(/_/g, ' ')}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default Unit;
