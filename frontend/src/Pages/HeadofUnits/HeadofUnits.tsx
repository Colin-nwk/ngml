
import { Button, Heading, Modal } from '@/Components';
import { HeadOfUnit, useCreateHeadOfUnitMutation, useGetHeadsOfUnitQuery } from '@/Redux/Features/HeadofUnit/headofUnitService';
import { Location, useGetLocationsQuery } from '@/Redux/Features/UserSettings/locationService';
import { useGetAllStaffQuery, User } from '@/Redux/Features/UserSettings/staffService';
import { Unit, useGetUnitsQuery } from '@/Redux/Features/UserSettings/unitService';
import { ArrowBack } from '@mui/icons-material';
import React, { useMemo, useState } from 'react';
import { FaTrashCan } from 'react-icons/fa6';
import { VscSend } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';



const HeadofUnits: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        user_id: '',
        unit_id: '',
        location_id: '',
        status: '1'
    });
    const [deletingUnitId, setDeletingUnitId] = useState<number | null>(null);

    const handleChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [key]: event.target.value });
    };

    const { data: locations } = useGetLocationsQuery();
    const { data: units } = useGetUnitsQuery();
    const { data: staff, isLoading: staffLoading, isError: staffError } = useGetAllStaffQuery();
    const [createHeadOfUnit, { isLoading: creating }] = useCreateHeadOfUnitMutation();
    const { data: heads } = useGetHeadsOfUnitQuery();



    const availableUsers = useMemo(() => {
        if (!Array.isArray(staff?.data?.data) || !Array.isArray(heads?.data)) return [];
        const assignedUserIds = heads.data.map(head => head.user_id);
        return staff.data.data.filter(user => !assignedUserIds.includes(user.id?.toString() || ''));
    }, [staff, heads]);


    const handleCreate = async () => {
        try {
            await createHeadOfUnit(formData).unwrap();
            setIsModalOpen(false);
            toast.success('Unit head assigned successfully');
            setFormData({ user_id: '', location_id: '', unit_id: '', status: '1' });
        } catch (error) {
            console.error('Failed to create route:', error);
            toast.error('Failed to assign unit head');
        }
    };

    const handleDelete = async (id: number) => {
        setDeletingUnitId(id);
        try {
            // Uncomment and implement the actual delete function
            toast.success('Unit deleted successfully: ' + id);
        } catch (error) {
            console.error('Failed to delete unit:', error);
        } finally {
            setDeletingUnitId(null);
        }
    };

    const getLocationName = (locationId: string): string => {
        if (Array.isArray(locations?.data)) {
            const location = locations.data.find((loc: Location) => loc.id?.toString() === locationId);
            return location ? location.location.replace(/_/g, ' ') : 'Unknown Location';
        }
        return 'Unknown Location';
    };

    const getUnitName = (unitId: string): string => {
        if (Array.isArray(units?.data)) {
            const unit = units.data.find((u: Unit) => u.id?.toString() === unitId);
            return unit ? unit.name.replace(/_/g, ' ') : 'Unknown Unit';
        }
        return 'Unknown Unit';
    };

    return (
        <div className="min-h-screen">
            <Link to={'/admin/settings'}>
                <div className='flex justify-center items-center border-2 h-[32px] w-[32px] rounded-[50%] mb-4'>
                    <ArrowBack color="success" style={{ fontSize: 'medium' }} />
                </div>
            </Link>

            <div className="flex flex-col h-full w-full bg-gray-100 p-6 rounded-xl mt-4">
                <div className="flex justify-between items-center mb-6">
                    <Heading size="h4" className="text-nnpcmediumgreen-950">Unit Heads</Heading>
                    <Button
                        type="secondary"
                        label="Assign unit heads"
                        action={() => setIsModalOpen(true)}
                        icon={<VscSend className="mr-2" />}
                        className="px-4 py-2 text-sm rounded-full"
                    />
                </div>

                <div className="bg-white rounded-xl p-6">
                    {staffLoading && <p className="text-gray-600">Loading ...</p>}
                    {staffError && <p className="text-red-500">Error loading...</p>}

                    {Array.isArray(heads?.data) && Array.isArray(staff?.data?.data) && (
                        <div className="space-y-2">
                            {heads.data.map((head: HeadOfUnit) => {
                                const staffMember = staff.data.data.find((item: User) => item.id?.toString() === head.user_id);
                                return (
                                    <div key={head.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300">
                                        <div className='flex flex-col items-start space-y-1'>

                                            <h3 className="font-semibold text-lg text-gray-800">Name:
                                                {' '}{staffMember?.name}</h3>
                                            {/* <p className="text-gray-600">Email: {' '} {staffMember?.email}</p> */}

                                            <p className="text-gray-500"> <span className='font-semibold text-lg text-gray-800'>Unit:</span> {getUnitName(head.unit_id)}</p>
                                            <p className="text-gray-500 "> <span className='font-semibold text-lg text-gray-800'>Location:</span>  {getLocationName(head.location_id)}</p>

                                        </div>
                                        <div className="flex space-x-2">
                                            <Button
                                                type="transparent"
                                                label={deletingUnitId === head.id ? 'removing...' : ''}
                                                action={() => handleDelete(head.id)}
                                                icon={<FaTrashCan />}
                                                className="px-3 py-1 text-sm rounded-full space-x-2 "
                                                disabled={deletingUnitId === head.id}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    size='medium'
                    title='Assign Unit Heads'
                    subTitle='Manage all unit heads to be used in user settings'
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
                                    label={creating ? 'Assigning...' : 'Assign Unit Head'}
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
                        <div>
                            <label htmlFor="user_id" className="block text-sm font-medium text-gray-700 capitalize">Users</label>
                            <select
                                id="user_id"
                                name="user_id"
                                value={formData.user_id}
                                onChange={handleChange('user_id')}
                                className="mt-1 block w-full rounded-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-nnpc-200 focus:border-nnpc-200 p-2.5"
                            >
                                <option value="">Select user</option>
                                {availableUsers.map((aStaff) => (
                                    <option key={aStaff.id} value={aStaff.id}>
                                        {aStaff.name.replace(/_/g, ' ')}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="unit_id" className="block text-sm font-medium text-gray-700 capitalize">Unit</label>
                            <select
                                id="unit_id"
                                name="unit_id"
                                value={formData.unit_id}
                                onChange={handleChange('unit_id')}
                                className="mt-1 block w-full rounded-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-nnpc-200 focus:border-nnpc-200 p-2.5"
                            >
                                <option value="">Select unit</option>
                                {/* {availableUnits.map((unit) => (
                                    <option key={unit.id} value={unit.id}>
                                        {unit.name.replace(/_/g, ' ')}
                                    </option>
                                ))} */}

                                {Array.isArray(units?.data) && units?.data.map((unit) => (
                                    <option key={unit.id} value={unit.id}>
                                        {unit.name.replace(/_/g, ' ')}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="location_id" className="block text-sm font-medium text-gray-700 capitalize">Location</label>
                            <select
                                id="location_id"
                                name="location_id"
                                value={formData.location_id}
                                onChange={handleChange('location_id')}
                                className="mt-1 block w-full rounded-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-nnpc-200 focus:border-nnpc-200 p-2.5"
                            >
                                <option>Select a location</option>
                                {Array.isArray(locations?.data) && locations.data.map((location) => (
                                    <option key={location.id} value={location.id}>
                                        {location.location.replace(/_/g, ' ')}
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

export default HeadofUnits;