import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { colors } from '../../../styles/colors';

const FullScreenWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
`;

const PopupWrapper = styled.div`
  position: fixed;
  top: 10vh;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 1000px;
  height: 80vh;
  background-color: #f8f8f8;
  padding: 30px;
  border-radius: 15px;
  box-sizing: border-box;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
  z-index: 100;
  overflow-y: auto;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; 
  

  @media (max-width: 768px) {
    width: 95%;
    top: 2%;
    padding: 20px;
  }
`;

const CloseButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  cursor: pointer;
  border: none;
  background: none;
  font-size: 24px;
  color: ${colors.deepBlue};
  transition: color 0.2s, transform 0.2s;

  &:hover {
    color: ${colors.red};
    transform: translateY(-2px);
  }
`;

const FilterButton = styled.button`
  padding: 10px 15px;
  border: none;
  background-color: ${colors.deepBlue};
  color: white;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.2s;

  &:hover {
    background-color: ${colors.lightBlue};
    transform: translateY(-2px);
  }
`;

const EventDetailWrapper = styled.div`
  background-color: white;
  margin-top: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const EventSummary = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 500px;
  padding: 10px;
  cursor: pointer;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #f9f9f9;
  }

  @media (max-width: 767px) {
    min-width: 200px;
  }
`;

const EventTable = styled(motion.table)`
  width: 100%;
  border-collapse: collapse;
  text-align: left;

  th, td {
    padding: 8px;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f4f4f4;
    color: #333;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const NoEventsMessage = styled.p`
  color: #826251;
  font-style: italic;
`;

const FilterSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
  background-color: #f4f4f4;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #568EA3;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin: auto;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ScrollableEventContainer = styled.div`
  width: 100%;
  overflow-y: auto;
  margin-top: 10px;
  padding-bottom: 10px;
`;


const variants = {
  open: { opacity: 1, height: "auto" },
  collapsed: { opacity: 0, height: 0 },
};

const EventDetail = ({ event, filterType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  const mainInfo = filterType === 'all' ?
    { 'Event': event.type || 'unnamed', 'Timestamp': event.timestamp || 'Not Available' } :
    { 'Listing #': event.listingId || 'Not Available', 'Timestamp': event.timestamp || 'Not Available' };

  return (
    <EventDetailWrapper>
      <EventSummary onClick={toggleOpen} initial="initial" animate={isOpen ? "open" : "collapsed"}>
        {Object.entries(mainInfo).map(([key, value], idx) => (
          <p key={idx}><strong>{key}:</strong> {value}</p>
        ))}
      </EventSummary>

      <AnimatePresence>
        {isOpen && (
          <EventTable variants={variants} initial="initial" animate="open" exit="collapsed">
            <tbody>
              {Object.entries(event).map(([key, value], idx) => (
                <tr key={idx}>
                  <td>{key}</td>
                  <td>{typeof value === 'string' ? value : JSON.stringify(value)} {(key === 'price' || key === 'amount') && 'Matic'}</td>
                </tr>
              ))}
            </tbody>
          </EventTable>
        )}
      </AnimatePresence>

    </EventDetailWrapper>
  );
};

const EventsPopup = ({ events, onClose, fetchEvents, marketEvents }) => {
  const [filterType, setFilterType] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await fetchEvents(filterType);
      setIsLoading(false);
    };

    fetchData();
  }, [filterType]);

  const handleFilterChange = (type) => {
    setFilterType(type);
  };

  return (
    <FullScreenWrapper>
      <PopupWrapper>
        <CloseButton onClick={onClose}>✖</CloseButton>
        <FilterSection>
          <FilterButton onClick={() => handleFilterChange('all')}>All Events</FilterButton>
          {Object.keys(marketEvents?.filtered ?? {}).map((eventFunction, index) => (
            <FilterButton key={index} onClick={() => handleFilterChange(eventFunction)}>
              {eventFunction.replace(/([A-Z])/g, ' $1').trim()} Events
            </FilterButton>
          ))}
        </FilterSection>

        <ScrollableEventContainer>
          {isLoading ? (
            <Spinner />
          ) : events.length === 0 ? (
            <NoEventsMessage>No events to display</NoEventsMessage>
          ) : (
            <AnimatePresence>
              {events.map((event, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                  <EventDetail event={event} filterType={filterType} />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </ScrollableEventContainer>
      </PopupWrapper>
    </FullScreenWrapper>
  );
};

export default EventsPopup;
