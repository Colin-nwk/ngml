import { EoiRequestTemplate } from '@/Components';
import { useState } from 'react';

const CustomerEOIPage = () => {
  const [status] = useState('Default Status');
  const [selectedRow] = useState({
    companyName: 'Provide Company Name',
    companyEmail: 'Provide an email address',
    companyNumber: 'Provide a number',
    status: 'Approved',
    approverName: 'Okoro Florish'
  });

  const handleClose = () => { };

  return (
    <div>
      <EoiRequestTemplate
        handleClose={handleClose}
        dateTime={'09th, Nov, 2023; 09:23:44 AM'}
        status={status}
        companyName={selectedRow.companyName}
        companyEmail={selectedRow.companyEmail}
        companyNumber={selectedRow.companyNumber}
        statusHeading={selectedRow.status}
        approverName={selectedRow.approverName}
      />
    </div>
  );
};

export default CustomerEOIPage;
