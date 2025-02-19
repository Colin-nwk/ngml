import { StatisticRectangleCard } from '@/Components';

const SettingsPage = () => {
    const cardData = [
        {
            title: 'Form Builder',
            link: '/admin/settings/formbuilder',
        },
        {
            title: 'Process Flow Builder',
            link: '/admin/settings/processflow',
        },
        {
            title: 'Route Builder',
            link: '/admin/settings/routebuilder',
        },
        {
            title: 'Assign Tasks',
            link: '/admin/settings/assigntasks',
        },
        {
            title: 'User Settings',
            link: '/admin/settings/usersettings',
        },
        {
            title: 'Head of Units',
            link: '/admin/settings/hou',
        },
    ];

    return (
        <div>
            <div className='text-[30px] text-[#49526A] font-[700]'>Builders:</div>
            <div className=" mt-6 gap-4 grid grid-cols-2" >
                {cardData.map((card, index) => (
                    <StatisticRectangleCard
                        key={index}
                        title={card.title}
                        to={card.link}
                    />
                ))}
            </div>
        </div>
    );
};

export default SettingsPage;
