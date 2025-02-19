

import { Button, Heading, Modal } from '@/Components';
import { useCreateDepartmentMutation, useDeleteDepartmentMutation, useGetDepartmentsQuery } from '@/Redux/Features/UserSettings/departmentService';
import { useState } from 'react';
import { FaTrashCan } from 'react-icons/fa6';
import { VscSend } from 'react-icons/vsc';
import { toast } from 'react-toastify';

const DepartmentGroup = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        status: '1'
    });
    const [deletingItemId, setDeletingItemId] = useState<number | null>(null);

    const handleChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [key]: event.target.value });
    };

    const { data, isLoading, isError } = useGetDepartmentsQuery();
    const [createDepartment, { isLoading: creating }] = useCreateDepartmentMutation();
    const [deleteDepartment] = useDeleteDepartmentMutation();

    const handleCreate = async () => {
        try {
            await createDepartment(formData).unwrap();
            setIsModalOpen(false);
            setFormData({ name: '', description: '', status: '1' });
            toast.success('Department created successfully');
        } catch (error) {
            console.error('Failed to create :', error);
        }
    };

    // Handles deletion of a route
    const handleDeleteRoute = async (id: number) => {
        setDeletingItemId(id);
        try {
            await deleteDepartment(id).unwrap();
            toast.success('Department deleted successfully');
        } catch (error) {
            console.error('Failed to delete department:', error);
        } finally {
            setDeletingItemId(null);
        }
    };

    return (
        <div className="">
            <div className="flex flex-col h-full w-full bg-gray-100 p-6 rounded-xl mt-4">
                <div className="flex justify-between items-center mb-6">
                    <Heading size="h4" className="text-nnpcmediumgreen-950">Departments</Heading>
                    <Button
                        type="secondary"
                        label="Create Department"
                        action={() => setIsModalOpen(true)}
                        icon={<VscSend className="mr-2" />}
                        className="px-4 py-2 text-sm rounded-full"
                    />
                </div>

                <div className="bg-white rounded-xl p-6">
                    {isLoading && <p className="text-gray-600"> Loading departments...</p>}
                    {isError && <p className="text-red-500">Error loading departments</p>}
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
                                        label={deletingItemId === item.id ? 'Deleting...' : 'Delete'}
                                        action={() => item?.id !== undefined ? handleDeleteRoute(item.id) : undefined}
                                        icon={<FaTrashCan />}
                                        className="px-3 py-1 text-sm rounded-full space-x-2"
                                        disabled={deletingItemId === item.id}
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
                    title='Create Departments'
                    subTitle='Add departments to be used in user settings'
                    buttons={[
                        <div key="modal-buttons" className='flex gap-2 mb-[-10px]'>
                            <div className='w-[120px]'>
                                <Button
                                    type="outline"
                                    label="Cancel"
                                    action={() => setIsModalOpen(false)}
                                    color="#FFFFFF"
                                    width="100%"
                                    height="40px"
                                    fontSize="16px"
                                    radius="20px"
                                    className='rounded-full'
                                />
                            </div>
                            <div className='w-[260px]'>
                                <Button
                                    type="secondary"
                                    label={creating ? 'Creating...' : 'Create Department'}
                                    action={handleCreate}
                                    color="#FFFFFF"
                                    width="100%"
                                    height="40px"
                                    fontSize="16px"
                                    radius="20px"
                                    className='rounded-full'
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
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default DepartmentGroup;
