import { useState, useCallback } from 'react';

export const useError = () => {
    const [error, setError] = useState<string>('');

    const handleError = useCallback((err: any) => {
        const errorMessage = err?.message || 'Operation failed';
        setError(errorMessage);
        setTimeout(() => setError(''), 3000);
    }, []);

    return { error, setError, handleError };
};