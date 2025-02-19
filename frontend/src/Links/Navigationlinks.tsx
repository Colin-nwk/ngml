import Businessicon from '../../public/assets/png-icons/Business.png';
import images from '../assets/index';


export const Navigationlinks = [
  { id: 1, name: 'Home', to: '/client/homepage', icon: images.Homeicon, type: 'primary' },
  {
    id: 2,
    name: 'Business',
    to: '/client/businessPage',
    icon: images.Businessicon,
    type: 'secondary',
    subMenu: [
      { id: 1, name: 'Forte oil', to: '/customer/customerbusinesspage', icon: Businessicon, type: 'primary' },
      { id: 2, name: 'Dangote', to: '/customer/customerbusinesspage', icon: Businessicon, type: 'primary' },
      { id: 3, name: 'Shaffa', to: '/customer/customerbusinesspage', icon: Businessicon, type: 'primary' }
    ]
  },
  { id: 3, name: 'Profile', to: '/client/customerprofilepage', icon: images.profileicon, type: 'primary' },
  {
    id: 4, name: 'Settings', to: '/client/businessPage', icon: images.Settingsicon, type: 'secondary',
    subMenu: [
      { id: 1, name: 'Business', to: '/customer/customerbusinesspage', icon: Businessicon, type: 'primary' },
      { id: 2, name: 'Business', to: '/customer/customerbusinesspage', icon: Businessicon, type: 'primary' },
      { id: 3, name: 'Business', to: '/customer/customerbusinesspage', icon: Businessicon, type: 'primary' }
    ]
  },
  { id: 5, name: 'Profile', to: '/client/customerprofilepage', icon: images.profileicon, type: 'primary' },
  { id: 6, name: 'Sample ', to: '/client/samplePage', icon: images.profileicon, type: 'primary' },

];


