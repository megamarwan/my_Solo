// useUpdate.ts
import { useState } from 'react';

const useUpdate = (baseUrl: string) => {
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const update = async (id: string | number, data: any) => {
        setIsPending(true);
        try {
            const response = await fetch(`${baseUrl}${id}`, {
                method: 'PUT', // Use 'PATCH' if you only want to update specific fields
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            if (!response.ok) throw Error('Could not update the resource');

            setIsPending(false);
            return true;
        } catch (err) {
            setError((err as Error).message);
            setIsPending(false);
            return false;
        }
    };

    return { update, isPending, error };
}

export default useUpdate;