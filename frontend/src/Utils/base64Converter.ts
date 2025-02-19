
export const convertFileToBase64 = (file: File): Promise<string> => {
    // console.log('Starting conversion to Base64', file.name, file.type, file.size);
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = () => {
            console.log('FileReader onload triggered');
            if (typeof reader.result === 'string') {
                console.log('File converted to Base64 successfully');
                // console.log('Base64 length:', reader.result.length);
                console.log('Base64 preview:', reader.result.substring(0, 50) + '...');
                resolve(reader.result);
            } else {
                console.error('reader.result is not a string', typeof reader.result);
                reject(new Error('Failed to convert file to Base64 string'));
            }
        };
        
        reader.onerror = (error) => {
            console.error('Error converting file to Base64:', error);
            reject(error);
        };
        reader.readAsDataURL(file);
    });
};