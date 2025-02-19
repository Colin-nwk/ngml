import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; 
import TabCustomer, { TabListInterface } from './TabCustomer';

const tablist: TabListInterface[] = [
    {
        name: 'Overview',
        ref: 'overview',
    },
    {
        name: 'Details',
        ref: 'details',
        sublist: [
            { name: 'Subdetail 1', ref: 'subdetail1' },
            { name: 'Subdetail 2', ref: 'subdetail2' },
        ],
    },
    {
        name: 'Settings',
        ref: 'settings',
    },
];

const tabContent = {
    overview: <div>Overview Content</div>,
    details: <div>Details Content</div>,
    subdetail1: <div>Subdetail 1 Content</div>,
    subdetail2: <div>Subdetail 2 Content</div>,
    settings: <div>Settings Content</div>,
};

describe('TabCustomer Component', () => {
    it('renders without crashing', () => {
        render(
            <MemoryRouter>
                <TabCustomer
                    activeTab="overview"
                    setActiveTab={() => { }}
                    tablist={tablist}
                    tabContent={tabContent}
                />
            </MemoryRouter>
        );
        expect(screen.getByText('Overview Content')).toBeInTheDocument();
    });

    it('should change the active tab when a tab is clicked', () => {
        const setActiveTab = vi.fn();
        render(
            <MemoryRouter>
                <TabCustomer
                    activeTab="overview"
                    setActiveTab={setActiveTab}
                    tablist={tablist}
                    tabContent={tabContent}
                />
            </MemoryRouter>
        );

        const detailsTab = screen.getByText(/details/i);
        fireEvent.click(detailsTab);

        expect(setActiveTab).toHaveBeenCalledWith('details');
    });

    it('should change the active tab when a dropdown selection is made', () => {
        const setActiveTab = vi.fn();
        render(
            <MemoryRouter>
                <TabCustomer
                    activeTab="overview"
                    setActiveTab={setActiveTab}
                    tablist={tablist}
                    tabContent={tabContent}
                />
            </MemoryRouter>
        );

        const combobox = screen.getByRole('combobox');
        fireEvent.mouseDown(combobox);

        const menu = screen.getByRole('listbox');

        const settingsOption = within(menu).getByText(/settings/i);
        fireEvent.click(settingsOption);

        expect(setActiveTab).toHaveBeenCalledWith('settings');
    });
});
