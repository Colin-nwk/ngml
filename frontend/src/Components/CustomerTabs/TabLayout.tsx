import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TabCustomer } from '../../Components/index';
import images from '../../assets/index';

interface Tab {
    name: string;
    ref: string;
    sublist?: Tab[];
}

interface TabContent {
    [key: string]: JSX.Element;
}

interface TabLayoutProps {
    title: string;
    width?: string;
    height?: string;
    backgroundColor?: string;
    color?: string;
    borderColor?: string;
    borderWidth?: string;
    borderRadius?: string;
    tablist: Tab[];
    tabContent: TabContent;
    showButtons?: boolean;
    // activeTab: string;
    // setActiveTab: (tab: string) => void;
    onUpdate?: (activeTab: string) => void;
}

/**
 * TabLayout component renders a layout with tabs and their corresponding content.
 * It allows for navigation between tabs and includes optional update and close buttons.
 * 
 * @component
 * @example
 * const tablist = [
 *   { name: 'Overview', ref: 'overview' },
 *   { name: 'Details', ref: 'details', sublist: [{ name: 'Subdetail 1', ref: 'subdetail1' }] },
 *   { name: 'Settings', ref: 'settings' }
 * ];
 * const tabContent = {
 *   overview: <div>Overview Content</div>,
 *   details: <div>Details Content</div>,
 *   subdetail1: <div>Subdetail 1 Content</div>,
 *   settings: <div>Settings Content</div>
 * };
 * 
 * <TabLayout
 *   title="My Tabs"
 *   tablist={tablist}
 *   tabContent={tabContent}
 *   onUpdate={(activeTab) => console.log('Tab updated:', activeTab)}
 * />
 * 
 * @param {TabLayoutProps} props - Props passed to the component
 * @param {string} props.title - The title of the tab layout
 * @param {string} [props.width] - The width of the tab layout container
 * @param {string} [props.height] - The height of the tab layout container
 * @param {string} [props.backgroundColor] - The background color of the tab layout container
 * @param {string} [props.color] - The text color of the tab layout container
 * @param {string} [props.borderColor] - The border color of the tab layout container
 * @param {string} [props.borderWidth] - The border width of the tab layout container
 * @param {string} [props.borderRadius] - The border radius of the tab layout container
 * @param {Tab[]} props.tablist - List of tabs to display
 * @param {TabContent} props.tabContent - Mapping of tab references to their content
 * @param {boolean} [props.showButtons=true] - Whether to show the update and close buttons
 * @param {function} [props.onUpdate] - Callback function to be called on update
 * @returns {JSX.Element} The TabLayout component
 */

const TabLayout: React.FC<TabLayoutProps> = ({
    title,
    width,
    height,
    backgroundColor,
    color,
    borderColor,
    borderWidth,
    borderRadius,
    tablist,
    tabContent,
    onUpdate,
    showButtons = true,
}) => {

    const [activeTab, setActiveTab] = useState<string>('')

    const navigate = useNavigate();

    /**
     * Handles the update action, calling the onUpdate callback if provided.
     */

    const handleUpdate = () => {
        console.log('Updating content for tab:', activeTab);
        if (onUpdate) {
            onUpdate(activeTab);
        } else {
            console.warn('No onUpdate callback provided');
        }
    };

    /**
     * Handles the close action, navigating back one step in the browser history.
     */

    const handleClose = () => {
        navigate(-1)
    };

    const containerStyle: React.CSSProperties = {
        width: width,
        height: height,
        backgroundColor: backgroundColor,
        color: color,
        borderColor: borderColor,
        borderWidth: borderWidth,
        borderRadius: borderRadius,
    };

    return (
        <div className="flex-1 ml-[6px] rounded-xl" style={containerStyle}>
            <div className="w-full h-8 mb-[30px] justify-between items-center inline-flex flex-wrap" >
                <div className="justify-start items-center gap-3 flex flex-grow">
                    <div className="text-center text-[#49526A] font-bold font-Mulish ml-3 md:ml-0 text-2xl md:text-3xl lg:text-3xl">{title}</div>
                </div>
                {showButtons && (
                    <div className="justify-end items-center gap-4 flex">
                        <div className="w-[90px] px-2 py-[4px] rounded-[20px] border border-gray-200">
                            <div className="text-sm font-normal font-['Mulish'] flex justify-center cursor-pointer items-center gap-2" onClick={handleUpdate}><p>Update</p></div>
                        </div>
                        <div className="w-[60px] px-2 py-[4px] rounded-[20px] border border-gray-200">
                            <div className="text-sm font-normal font-['Mulish'] flex justify-between items-center cursor-pointer gap-1" onClick={handleClose}><img src={images.cancel} alt="close icon" width={'10px'} /><p>close</p></div>
                        </div>
                    </div>
                )}
            </div>
            <TabCustomer setActiveTab={setActiveTab} activeTab={activeTab} tablist={tablist} tabContent={tabContent} />
        </div>
    )
}

export default TabLayout;