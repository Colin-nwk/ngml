import images from '../assets/index';

export const ClientLinks = [
  { id: 1, name: 'Home', to: '/client', icon: images.Homeicon, type: 'primary' },
  {
    id: 2,
    name: 'Manager',
    to: '',
    icon: images.Businessicon,
    type: 'secondary',
    subMenu: [
      { id: 1, name: 'Operations', to: '', icon: images.designation, type: 'primary' },
      { id: 2, name: 'Contracts', to: '', icon: images.staff, type: 'primary' },
      { id: 3, name: 'Legal', to: '', icon: images.edit, type: 'primary' },
      { id: 4, name: 'Accounts', to: '', icon: images.accounticon, type: 'primary' },
      { id: 5, name: 'Staff', to: '', icon: images.profilename, type: 'primary' }

    ]
  },
  {
    id: 3,
    name: 'Records',
    to: '',
    icon: images.Recordicon,
    type: 'secondary',
    subMenu: [
      { id: 1, name: 'Suppliers', to: '/admin/records/suppliers', icon: images.Suppliericon, type: 'primary' },
      { id: 2, name: 'Customers', to: '/admin/records/customer', icon: images.Customericon, type: 'primary' },
      { id: 3, name: 'Request', to: '/admin/records/requestpage', icon: images.Requesticon, type: 'primary' },
      { id: 4, name: 'Site Visits', to: '/admin/records/sitevisit', icon: images.Sitevisiteicon, type: 'primary' },
      { id: 5, name: 'Connect Projects', to: '/admin/records/connectprojectpage', icon: images.Invoiceicon, type: 'primary' },
      { id: 6, name: 'Bids', to: '/admin/records/bidspage', icon: images.Bidicon, type: 'primary' }


    ]
  },
  { id: 4, name: 'Reports', to: '', icon: images.Reporticon, type: 'primary' },
  { id: 5, name: 'Communications', to: '', icon: images.Communicationicon, type: 'primary' },
  { id: 6, name: 'Profile', to: '', icon: images.Profilenameicon, type: 'primary' },
  { id: 7, name: 'Settings', to: '', icon: images.Settingicon, type: 'primary' },

];



