import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { useState, useCallback } from 'react';

// Mock implementation of useError hook
const useError = () => {
  const [error, setError] = useState('');

  const handleError = useCallback((err: any) => {
    const errorMessage = err?.message || 'Operation failed';
    setError(errorMessage);
    
    // Clear error after 3 seconds
    setTimeout(() => {
      setError('');
    }, 3000);
  }, []);

  return { error, handleError };
};

describe('useError Hook', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('should set error message and clear it after 3 seconds', () => {
    const { result } = renderHook(() => useError());

    act(() => {
      result.current.handleError(new Error('Test error'));
    });

    expect(result.current.error).toBe('Test error');

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(result.current.error).toBe('');
  });

  it('should handle errors without message property', () => {
    const { result } = renderHook(() => useError());

    act(() => {
      result.current.handleError({});
    });

    expect(result.current.error).toBe('Operation failed');
  });
});