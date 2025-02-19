export const  convertToDynamicContentArray=(inputString:string) =>{
  const parts = inputString.split(',');
  const trimmedParts = parts.map(part => part.trim());
  return JSON.stringify(trimmedParts);
}

export const reverseDynamicContentArray = (jsonString: string | null | undefined) => {
    if (!jsonString) return '';
    try {
        // Check if the string is already in comma-separated format
        if (!jsonString.startsWith('[')) {
            return jsonString;
        }
        const array = JSON.parse(jsonString);
        return Array.isArray(array) ? array.join(', ') : '';
    } catch (error) {
        // If JSON parsing fails, return the original string
        return jsonString;
    }
}