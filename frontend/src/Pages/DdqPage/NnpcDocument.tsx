import React from 'react';
import images from '../../assets/index';

const NnpcDocument: React.FC = () => {
  return (
    <div className="h-10 mx-auto p-4">
      <div className="flex justify-between mb-4">
        <div className="text-left text-sm">
          Nigerian National Petroleum Corporation
          <br />
          Address Line 1
          <br />
          Address Line 2
          <br />
          Contact: +234-123-456-789
        </div>
        <img src={images.nnpclogo} alt="NNPC Logo" className="w-5 h-5" />
      </div>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold ">Formal Letter</h1>
        <p className='text-sm'>Date: April 12, 2024</p>
      </div>
      <div className="mb-8 text-small">
        <p>
          [Recipient's Name]
          <br />
          Deputy Director
        </p>
      </div>
      <div className="mb-8 text-sm">
        <p>Dear Philip,</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed imperdiet, odio sit amet luctus sodales,
          sapien purus viverra metus, nec fermentum felis diam non risus.

        </p>
        <p className='text-sm'>
          Sincerely,
          <br />
          NNPC
          <br />
          Managing Durector
          <br />
          Nigerian National Petroleum Corporation
        </p>
      </div>
    </div>
  );
};

export default NnpcDocument;