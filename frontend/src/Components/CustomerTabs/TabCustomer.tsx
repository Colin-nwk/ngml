import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { FC, ReactNode, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface TabInterface {
  name: string;
  ref: string;
}

export interface TabListInterface {
  name: string;
  ref: string;
  children?: TabInterface[];
  sublist?: TabListInterface[];
  content?: 'icon' | 'numeric';
  icon?: ReactNode;
}

interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tablist: TabListInterface[];
  tabContent: { [key: string]: ReactNode };
}

const TabCustomer: FC<TabsProps> = ({
  activeTab,
  setActiveTab,
  tablist,
  tabContent,
}) => {
  // const [panelName, setPanelName] = useState<string>('');
  // console.log(panelName);
  const navigate = useNavigate();
  const { customerId, supplierId, projectId, tabId } = useParams<{
    customerId: string;
    supplierId?: string;
    projectId: string;
    tabId?: string;
  }>();

  useEffect(() => {
    if (tablist.length > 0 && !activeTab) {
      const initialTab = tablist.find((tab) => tab.ref === tabId) || tablist[0];
      // setPanelName(capitalizeFirstLetter(initialTab.name));
      setActiveTab(initialTab.ref);
    }
  }, [tablist, activeTab, setActiveTab, tabId]);

  useEffect(() => {
    if (activeTab) {
      if (customerId) {
        navigate(
          `/admin/records/customer/${customerId}/${projectId}/${activeTab}`,
        );
      } else if (supplierId) {
        navigate(
          `/admin/records/supplier/${supplierId}/${projectId}/${activeTab}`,
        );
      }
    }
  }, [activeTab, navigate, customerId, supplierId, projectId]);

  const handleTabChange = (tab: TabListInterface): void => {
    setActiveTab(tab.ref);
    // setPanelName(tab.name);
  };

  const handleDropdownChange = (event: SelectChangeEvent<string>): void => {
    const selectedRef = event.target.value;
    const selectedTab = tablist
      .flatMap((tab) => [tab, ...(tab.sublist || [])])
      .find((tab) => tab.ref === selectedRef);

    if (selectedTab) {
      handleTabChange(selectedTab);
    }
  };

  const capitalizeFirstLetter = (str: string): string => {
    if (str.length === 0) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="flex flex-col">
      <div className="mb-3 lg:hidden ml-2 border h-[32] rounded-[10px]">
        <Select
          value={activeTab}
          onChange={handleDropdownChange}
          displayEmpty
          fullWidth
          variant="outlined"
          sx={{
            outline: 'none',
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
          }}
        >
          {tablist.map((tab) => [
            <MenuItem key={tab.ref} value={tab.ref}>
              {capitalizeFirstLetter(tab.name)}
            </MenuItem>,
            ...(tab.sublist || []).map((sub) => (
              <MenuItem
                key={sub.ref}
                value={sub.ref}
                style={{ marginLeft: '20px' }}
              >
                - - {capitalizeFirstLetter(sub.name)}
              </MenuItem>
            )),
          ])}
        </Select>
      </div>

      <div className="flex flex-1" >
        <div className="lg:w-1/4 flex flex-col items-start justify-start space-y-2 mr-3">
          <div className="hidden lg:flex flex-col w-full space-y-3" >
            {tablist.map((tab) => (
              <div key={tab.ref}>
                <div
                  className={`flex justify-between items-center cursor-pointer capitalize ${tab.ref === activeTab ? 'text-primary' : 'text-neutral-600'}`}
                  onClick={() => handleTabChange(tab)}
                >
                  <div className="flex truncate text-neutral-600 font-medium text-base capitalize justify-start">
                    {tab.content === 'icon' && tab.icon}
                    {tab.content === 'numeric' && (
                      <span className="mr-1 text-[12px]">
                        {tablist.indexOf(tab) + 1}
                      </span>
                    )}
                    <h4 className="truncate text-neutral-600 font-[500] text-[12px] mb-[2px] capitalize leading-relaxed ml-1">
                      {tab.name}
                    </h4>
                  </div>
                  {tab.ref === activeTab && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[#00AF50] transition-all ease-in-out duration-300"></span>
                  )}
                </div>

                {tab.ref === activeTab && tab.sublist && (
                  <div className="lg:ml-4 space-y-2">
                    {tab.sublist.map((sub) => (
                      <div
                        key={sub.ref}
                        className="flex justify-between items-center mt-[10px] cursor-pointer capitalize"
                        onClick={() => handleTabChange(sub)}
                      >
                        <div className="flex truncate text-neutral-600 font-medium text-base capitalize justify-start">
                          <h4 className="truncate text-neutral-600 font-[500] mb-[4px] text-[12px] capitalize leading-relaxed ml-1">
                            {sub.name}
                          </h4>
                        </div>
                        {sub.ref === activeTab && (
                          <span className="h-1.5 w-1.5 rounded-full bg-[#00AF50] transition-all ease-in-out duration-300"></span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div style={{ border: '1px', width: '100%' }} className="">
          {tabContent[activeTab]}
        </div>
      </div>
    </div>
  );
};

export default TabCustomer;
