import React from "react";
import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Drawer,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  PowerIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";

export function Sidebar() {
  const [openAccordion, setOpenAccordion] = React.useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const handleAccordionToggle = (value) => {
    setOpenAccordion(openAccordion === value ? 0 : value);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className='relative'>
      {/* Hamburger Menu for Mobile */}
      <IconButton
        onClick={toggleDrawer}
        className='lg:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white'
      >
        <Bars3Icon className='h-6 w-6' />
      </IconButton>

      {/* Drawer for Mobile */}
      <Drawer
        open={isDrawerOpen}
        onClose={toggleDrawer}
        className='lg:hidden'
        overlayProps={{ className: "bg-black bg-opacity-40" }}
      >
        <div className='p-4'>
          <button
            onClick={toggleDrawer}
            className='text-red-500 hover:text-red-700'
          >
            Close
          </button>
        </div>
        <SidebarContent
          handleAccordionToggle={handleAccordionToggle}
          openAccordion={openAccordion}
          toggleDrawer={toggleDrawer}
        />
      </Drawer>

      {/* Sidebar for Desktop */}
      <div className='hidden lg:block h-full w-64 bg-gray-800'>
        <SidebarContent
          handleAccordionToggle={handleAccordionToggle}
          openAccordion={openAccordion}
        />
      </div>
    </div>
  );
}

function SidebarContent({
  handleAccordionToggle,
  openAccordion,
  toggleDrawer,
}) {
  return (
    <div className='flex flex-col h-full bg-gray-800 text-white'>
      <Typography
        variant='h5'
        className='p-6 text-center font-bold border-b border-gray-700'
      >
        My Dashboard
      </Typography>
      <List className='flex-1'>
        <ListItem onClick={toggleDrawer}>
          <ListItemPrefix>
            <UserCircleIcon className='h-5 w-5' />
          </ListItemPrefix>
          Profile
        </ListItem>
        <Accordion open={openAccordion === 1} className='!overflow-visible'>
          <AccordionHeader
            onClick={() => handleAccordionToggle(1)}
            className='flex'
          >
            <ListItemPrefix>
              <ShoppingBagIcon className='h-5 w-5' />
            </ListItemPrefix>
            Portfolio
            {openAccordion === 1 ? (
              <ChevronDownIcon className='ml-auto h-5 w-5' />
            ) : (
              <ChevronRightIcon className='ml-auto h-5 w-5' />
            )}
          </AccordionHeader>
          <AccordionBody className='!z-50 !bg-gray-700'>
            <List>
              <ListItem onClick={toggleDrawer}>
                <ListItemPrefix />
                Product 1
              </ListItem>
              <ListItem onClick={toggleDrawer}>
                <ListItemPrefix />
                Product 2
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        <ListItem onClick={toggleDrawer}>
          <ListItemPrefix>
            <PresentationChartBarIcon className='h-5 w-5' />
          </ListItemPrefix>
          Reports
        </ListItem>
        <ListItem onClick={toggleDrawer}>
          <ListItemPrefix>
            <Cog6ToothIcon className='h-5 w-5' />
          </ListItemPrefix>
          Settings
        </ListItem>
      </List>
      <div className='p-4 border-t border-gray-700'>
        <ListItem onClick={toggleDrawer}>
          <ListItemPrefix>
            <PowerIcon className='h-5 w-5' />
          </ListItemPrefix>
          Sign Out
        </ListItem>
      </div>
    </div>
  );
}
