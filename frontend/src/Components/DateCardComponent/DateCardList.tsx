import { FC, useState } from 'react';
import DateCard, { DateCardProps } from './DateCard'


/**
 * @typedof {Object} DateCardListProps - Props for the DateCardList component.
 * @property {CardType} cardType - Type of the date cards to be rendered (primary or secondary).
 * @property {number} startDate - The start date for generating date cards.
 * @property {number} endDate - The end date for generating date cards.
 */
interface DateCardListProps {
    startDate: number;
    endDate: number;
    cardType: 'primary' | 'secondary';
}

/**
 * DateCardList component renders a list of DateCard components based on the given range.
 * @param {DateCardListProps} props - Props for the DateCardList component.
 * @returns {React.ReactElement} React component representing the list of date cards.
 */
const DateCardList: FC<DateCardListProps> = ({ cardType, startDate, endDate }) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    /**
     * Handles the toggling of the active state for a specific date card.
     * @param {number} index - Index of the date card.
     */

    const handleToggleActive = (index: number) => {
        setActiveIndex(index === activeIndex ? null : index);
    };


    /**
    * Generates an array of JSX elements representing DateCard components based on the given range.
    * @returns {JSX.Element[]} Array of JSX elements representing date cards.
    */
    const generateDateCards = () => {
        const cards: JSX.Element[] = [];

        for (let i = startDate; i <= endDate; i++) {
            const currentDate = new Date();
            currentDate.setDate(i);

            const cardProps: DateCardProps = {
                day: currentDate.getDate(),
                weekDay: currentDate.toLocaleDateString(undefined, { weekday: 'short' }),
                month: currentDate.toLocaleDateString(undefined, { month: 'long' }),
                cardType: cardType,
                isActive: i === activeIndex,
                onToggleActive: () => handleToggleActive(i),

            };

            cards.push(<DateCard key={currentDate.getTime()} {...cardProps} />);
        }

        return cards;
    };

    return <div style={{ display: 'flex', }}>{generateDateCards()}</div>;
};

export default DateCardList;
