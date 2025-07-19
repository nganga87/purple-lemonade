
'use server';

// Mock function to generate a sub-address ID
export const generateSubAddress = (primaryNftId: string, apartmentNumber: string): string => {
    const primaryPart = primaryNftId.slice(2, 10);
    
    let aptHash = 0;
    for (let i = 0; i < apartmentNumber.length; i++) {
        const char = apartmentNumber.charCodeAt(i);
        aptHash = ((aptHash << 5) - aptHash) + char;
        aptHash |= 0; // Convert to 32bit integer
    }
    const aptPart = (aptHash & 0xFFFFFF).toString(16).toUpperCase().padStart(6, '0');
    
    return `0x${primaryPart}SUB${aptPart}${'0'.repeat(42 - 13 - aptPart.length)}`.slice(0, 42);
};

    