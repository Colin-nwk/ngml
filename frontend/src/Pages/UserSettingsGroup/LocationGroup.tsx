

import { Button, Heading, Modal } from '@/Components';
import { useCreateLocationMutation, useDeleteLocationMutation, useGetLocationsQuery } from '@/Redux/Features/UserSettings/locationService';
import { useState } from 'react';
import { FaTrashCan } from 'react-icons/fa6';
import { VscSend } from 'react-icons/vsc';
import { toast } from 'react-toastify';

const LocationGroup = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        location: '',
        zone: '',
        state: ''
    });
    const [deletingItemId, setDeletingItemId] = useState<number | null>(null);

    const handleChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [key]: event.target.value });
    };

    const { data, isLoading, isError } = useGetLocationsQuery();
    const [create, { isLoading: creating }] = useCreateLocationMutation();
    const [deleteLocation] = useDeleteLocationMutation();

    const handleCreate = async () => {
        try {
            await create(formData).unwrap();
            setIsModalOpen(false);
            setFormData({
                location: '',
                zone: '',
                state: ''
            });
            toast.success('Location created successfully');
        } catch (error) {
            console.error('Failed to create :', error);
        }
    };

    // Handles deletion of a route
    const handleDelete = async (id: number) => {
        setDeletingItemId(id);
        try {
            await deleteLocation(id).unwrap();
            toast.success('Location deleted successfully');
        } catch (error) {
            console.error('Failed to delete location:', error);
        } finally {
            setDeletingItemId(null);
        }
    };

    return (
        <div className="">
            <div className="flex flex-col h-full w-full bg-gray-100 p-6 rounded-xl mt-4">
                <div className="flex justify-between items-center mb-6">
                    <Heading size="h4" className="text-nnpcmediumgreen-950">Locations</Heading>
                    <Button
                        type="secondary"
                        label="Create Location"
                        action={() => setIsModalOpen(true)}
                        icon={<VscSend className="mr-2" />}
                        className="px-4 py-2 text-sm rounded-full"
                    />
                </div>

                <div className="bg-white rounded-xl p-6">
                    {isLoading && <p className="text-gray-600"> Loading locations...</p>}
                    {isError && <p className="text-red-500">Error loading locations</p>}
                    {Array.isArray(data?.data) && (
                        <div className="space-y-2">
                            {data.data.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300"
                                >
                                    <span className="capitalize font-medium text-gray-800">{item.location}</span>
                                    <Button
                                        type="tertiary"
                                        label={deletingItemId === item.id ? 'Deleting...' : 'Delete'}
                                        action={() => item?.id !== undefined ? handleDelete(item.id) : undefined}
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
                    title='Create Locations'
                    subTitle='Add locations to be used in user settings'
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
                                    label={creating ? 'Creating...' : 'Create Location'}
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
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700 capitalize">Location Name</label>
                            <input
                                id="location"
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange('location')}
                                className="mt-1 block w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-nnpc-200 focus:border-nnpc-200 p-2.5"
                            />
                        </div>
                        <div>
                            <label htmlFor="zone" className="block text-sm font-medium text-gray-700 capitalize">Zone</label>
                            <input
                                id="zone"
                                type="text"
                                name="zone"
                                value={formData.zone}
                                onChange={handleChange('zone')}
                                className="mt-1 block w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-nnpc-200 focus:border-nnpc-200 p-2.5"
                            />
                        </div>
                        <div>
                            <label htmlFor="state" className="block text-sm font-medium text-gray-700 capitalize">State</label>
                            <input
                                id="state"
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleChange('state')}
                                className="mt-1 block w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-nnpc-200 focus:border-nnpc-200 p-2.5"
                            />
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default LocationGroup;
