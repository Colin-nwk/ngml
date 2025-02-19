import ProcessFlowLayout from '@/Layout/ProcessFlowLayout';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ProcessFlowBuilder from './component/ProcessFlowBuilder';


const ProcessFlowGenerator = () => {

    return (
        <ProcessFlowLayout>
            <DndProvider backend={HTML5Backend}>
                <ProcessFlowBuilder />
            </DndProvider>
        </ProcessFlowLayout>
    )
}

export default ProcessFlowGenerator