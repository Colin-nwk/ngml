
import { useDrag } from 'react-dnd';

export const DraggableItem = ({ type, name }: { type: string; name: string }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type,
        item: { name },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={drag}
            className={`p-2 mb-2 bg-white rounded cursor-move ${isDragging ? 'opacity-50' : ''}`}
        >
            {name}
        </div>
    );
};

