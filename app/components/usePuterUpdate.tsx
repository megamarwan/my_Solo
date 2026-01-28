// useUpdatePuter.ts
import { useState } from 'react';
import puter from "@heyputer/puter.js";

const useUpdatePuter = () => {
    const [isPending, setIsPending] = useState(false);

    const updatePuterFile = async (fileName: string, data: any) => {
        setIsPending(true);
        try {
            // Puter overwrites the file if it exists
            const path = `Documents/merchandise/${fileName}`;
            const content = JSON.stringify(data);
            
            await puter.fs.write(path, content);
            
            setIsPending(false);
            return true;
        } catch (err) {
            console.error("Puter update error:", err);
            setIsPending(false);
            return false;
        }
    };

    return { updatePuterFile, isPending };
};

export default useUpdatePuter;