import { useState } from 'react';

const useDelete = (baseUrl: string) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // We pass the ID here so the hook is reusable for any item
  const performDelete = async (id: number | string) => {
    setIsDeleting(true);
    setDeleteError(null);

    try {
      const res = await fetch(`${baseUrl}${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw Error('Could not delete the resource');
      }

      setIsDeleting(false);
      return true; // Success
    } catch (err) {
      setDeleteError((err as Error).message);
      setIsDeleting(false);
      return false; // Failed
    }
  };

  return { performDelete, isDeleting, deleteError };
};

export default useDelete;