
import { cn } from '@/Utils/cn';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import React from 'react';

interface PDFViewerProps {
    url: string;
    className?: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ url, className = '' }) => {
    const documents = [
        { uri: url }
    ];

    return (
        <div className={cn('w-full h-fit', className)}>
            <DocViewer
                documents={documents}
                pluginRenderers={DocViewerRenderers}
                config={{
                    header: {
                        disableHeader: true,
                        disableFileName: false,
                        retainURLParams: false
                    }
                }}
                style={{ height: '100%' }}
            />
        </div>
    );
};

export default PDFViewer;