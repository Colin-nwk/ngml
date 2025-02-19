

import { Button, Heading, Modal } from '@/Components';
import { Route, useCreateRouteMutation, useDeleteRouteMutation, useGetRoutesQuery, useUpdateRouteMutation } from '@/Redux/Features/RouteBuilder/routeService';
import { convertToDynamicContentArray, reverseDynamicContentArray } from '@/Utils/convertToDynamicContentArray';
import { ArrowBack } from '@mui/icons-material';

import { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { FaTrashCan } from 'react-icons/fa6';
import { VscSend } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const RouteBuilder = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [routeName, setRouteName] = useState('');
    const [routeLink, setRouteLink] = useState('');
    const [dynamicContent, setDynamicContent] = useState('');
    const [deletingRouteId, setDeletingRouteId] = useState<number | null>(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);

    const { data: routes, isLoading, isError } = useGetRoutesQuery();
    const [createRoute, { isLoading: creating }] = useCreateRouteMutation();
    const [deleteRoute] = useDeleteRouteMutation();
    const [updateRoute, { isLoading: updating }] = useUpdateRouteMutation();


    const handleCreateRoute = async () => {
        try {
            await createRoute({
                name: routeName,
                link: `https://ngml.skillzserver.com/${routeLink}`,
                status: 1,
                dynamic_content: convertToDynamicContentArray(dynamicContent)
            }).unwrap();
            setIsModalOpen(false);
            setRouteName('');
            setRouteLink('');
            setDynamicContent('');

            toast.success('Route created successfully');
        } catch (error) {
            console.error('Failed to create route:', error);
            toast.error('Failed to create route');
        }
    };



    const handleUpdateRoute = async () => {
        if (!selectedRoute?.id) return;

        try {
            await updateRoute({
                id: selectedRoute.id,
                data: {
                    name: selectedRoute.name,
                    link: selectedRoute.link,
                    dynamic_content: convertToDynamicContentArray(selectedRoute.dynamic_content || ''),
                    status: selectedRoute.status
                }
            }).unwrap();

            setIsUpdateModalOpen(false);
            setSelectedRoute(null);
            toast.success('Route updated successfully');
        } catch (error) {
            console.error('Failed to update route:', error);
            toast.error('Failed to update route');
        }
    };

    // Handles deletion of a route
    const handleDeleteRoute = async (id: number) => {
        setDeletingRouteId(id);
        try {
            await deleteRoute(id).unwrap();
            toast.success('Route deleted successfully');
        } catch (error) {
            console.error('Failed to delete route:', error);
            // toast.error('Failed to delete route');
        } finally {
            setDeletingRouteId(null);
        }
    };



    return (
        <div className="">
            <Link to={'/admin/settings'}>
                <div className='flex justify-center items-center border-2 h-[32px] w-[32px] rounded-[50%]'>
                    <ArrowBack color="success" style={{ fontSize: 'medium' }} />
                </div>
            </Link>

            <div className="flex flex-col h-full w-full bg-gray-100 p-6 rounded-xl mt-4">
                <div className="flex justify-between items-center mb-6">
                    <Heading size="h4" className="text-nnpcmediumgreen-950">Route Builder</Heading>
                    <Button
                        type="secondary"
                        label="Create Route"
                        action={() => setIsModalOpen(true)}
                        icon={<VscSend className="mr-2" />}
                        className="px-4 py-2 text-sm rounded-lg"
                    />
                </div>

                <div className="bg-white rounded-xl p-6">
                    <h2 className="text-2xl font-bold mb-4 text-nnpcmediumgreen-950">Existing Routes</h2>
                    {isLoading && <p className="text-gray-600">Loading routes...</p>}
                    {isError && <p className="text-red-500">Error loading routes</p>}
                    {routes?.data && (
                        <div className="space-y-2">
                            {routes.data.map((route) => (
                                <div key={route.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300">
                                    <span className="capitalize font-medium text-gray-800">{route.name}</span>
                                    <span className="text-gray-600 truncate max-w-md">{route.link}</span>
                                    <div className="flex gap-2">
                                        <Button
                                            type="secondary"
                                            label="Edit"
                                            action={() => {
                                                setSelectedRoute(route);
                                                setIsUpdateModalOpen(true);
                                            }}
                                            icon={<FaEdit />}
                                            className="px-3 py-1 text-sm rounded-lg space-x-2"
                                        />
                                        <Button
                                            type="outline"
                                            label={deletingRouteId === route.id ? 'Deleting...' : 'Delete'}
                                            action={() => route?.id !== undefined ? handleDeleteRoute(route.id) : undefined}
                                            icon={<FaTrashCan />}
                                            className="px-3 py-1 text-sm rounded-lg space-x-2"
                                            disabled={deletingRouteId === route.id}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    size='medium'
                    title='Create Routes'
                    subTitle='Add routes to be used in the processflow and tasks'
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
                                />
                            </div>
                            <div className='w-[260px]'>
                                <Button
                                    type="secondary"
                                    label={creating ? 'Creating...' : 'Create Route'}
                                    action={handleCreateRoute}
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
                    <div>

                        {/* {http://localhost:5173/admin/records/customer?createCustomer=true} */}
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 capitalize">Route Name</label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            value={routeName}
                            onChange={(e) => setRouteName(e.target.value)}
                            className="mt-1 block w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-nnpc-200 focus:border-nnpc-200 p-2.5"
                        />

                        <label htmlFor="link" className="block text-sm font-medium text-gray-700 capitalize">Route </label>
                        <input
                            id="link"
                            type="text"
                            name="link"
                            value={routeLink}
                            onChange={(e) => setRouteLink(e.target.value)}
                            className="mt-1 block w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-nnpc-200 focus:border-nnpc-200 p-2.5"
                        />

                        <label htmlFor="dynamic_content" className="block text-sm font-medium text-gray-700 capitalize">Dynamic Content </label>
                        <input
                            id="dynamic_content"
                            type="text"
                            name="dynamic_content"
                            value={dynamicContent}
                            onChange={(e) => setDynamicContent(e.target.value)}
                            className="mt-1 block w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-nnpc-200 focus:border-nnpc-200 p-2.5"
                        />
                    </div>
                </Modal>

                {/* EDit */}
                <Modal
                    isOpen={isUpdateModalOpen}
                    onClose={() => {
                        setIsUpdateModalOpen(false);
                        setSelectedRoute(null);
                    }}
                    size='medium'
                    title='Update Route'
                    subTitle='Update route details'
                    buttons={[
                        <div key="modal-buttons" className='flex gap-2 mb-[-10px]'>
                            <div className='w-[120px]'>
                                <Button
                                    type="outline"
                                    label="Cancel"
                                    action={() => {
                                        setIsUpdateModalOpen(false);
                                        setSelectedRoute(null);
                                    }}
                                    color="#FFFFFF"
                                    width="100%"
                                    height="40px"
                                    fontSize="16px"
                                    radius="20px"
                                />
                            </div>
                            <div className='w-[260px]'>
                                <Button
                                    type="secondary"
                                    label={updating ? 'Updating...' : 'Update Route'}
                                    action={handleUpdateRoute}
                                    color="#FFFFFF"
                                    width="100%"
                                    height="40px"
                                    fontSize="16px"
                                    radius="20px"
                                    disabled={updating}
                                />
                            </div>
                        </div>
                    ]}
                >
                    <div>
                        <label htmlFor="update-name" className="block text-sm font-medium text-gray-700 capitalize">Route Name</label>
                        <input
                            id="update-name"
                            type="text"
                            name="name"
                            value={selectedRoute?.name || ''}
                            onChange={(e) => setSelectedRoute(prev => prev ? { ...prev, name: e.target.value } : null)}
                            className="mt-1 block w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-nnpc-200 focus:border-nnpc-200 p-2.5"
                        />

                        <label htmlFor="update-link" className="block text-sm font-medium text-gray-700 capitalize">Route </label>
                        <input
                            id="update-link"
                            type="text"
                            name="link"
                            value={selectedRoute?.link || ''}
                            onChange={(e) => setSelectedRoute(prev => prev ? { ...prev, link: e.target.value } : null)}
                            className="mt-1 block w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-nnpc-200 focus:border-nnpc-200 p-2.5"
                        />

                        <label htmlFor="update-dynamic-content" className="block text-sm font-medium text-gray-700 capitalize">Dynamic Content </label>
                        <input
                            id="update-dynamic-content"
                            type="text"
                            name="dynamic_content"
                            // value={selectedRoute?.dynamic_content ?
                            //     (typeof selectedRoute.dynamic_content === 'string' ?
                            //         reverseDynamicContentArray(selectedRoute.dynamic_content) :
                            //         selectedRoute.dynamic_content
                            //     ) : ''}
                            value={reverseDynamicContentArray(selectedRoute?.dynamic_content) || ''}
                            onChange={(e) => setSelectedRoute(prev => prev ?
                                { ...prev, dynamic_content: e.target.value } :
                                null
                            )}
                            className="mt-1 block w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-nnpc-200 focus:border-nnpc-200 p-2.5"
                        />
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default RouteBuilder;
