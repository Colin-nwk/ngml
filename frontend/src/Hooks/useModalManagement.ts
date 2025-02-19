import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useModalManagement = (modalQueryParam: string) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const modalParam = searchParams.get(modalQueryParam);

    if (modalParam === 'true') {
      setIsModalOpen(true);
    }
  }, [location.search, modalQueryParam]);

  const toggleModal = (open: boolean) => {
    setIsModalOpen(open);
    const searchParams = new URLSearchParams(location.search);

    if (open) {
      searchParams.set(modalQueryParam, 'true');
    } else {
      searchParams.delete(modalQueryParam);
    }
    navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
  };

  return { isModalOpen, toggleModal };
};











// import { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';

// export const useModal = (initialState: boolean = false, paramName: string = 'createCustomer', paramValue: string = 'true') => {
//     const [isModalOpen, setIsModalOpen] = useState(initialState);
//     const navigate = useNavigate();
//     const location = useLocation();

//     const toggleModal = (open: boolean) => {
//         setIsModalOpen(open);

//         const searchParams = new URLSearchParams(location.search);

//         if (open) {
//             searchParams.set(paramName, paramValue);  
//         } else {
//             searchParams.delete(paramName);  
//         }

//         navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
//     };

//     return [isModalOpen, toggleModal] as const;
// };
