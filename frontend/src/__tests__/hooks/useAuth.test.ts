import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useState, useCallback } from 'react';

const useAuth = () => {
  const [user, setUser] = useState(null);

  const isAuthenticated = useCallback(() => {
    return !!localStorage.getItem('token');
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        throw new Error('login failed');
      }
      
      const data = await response.json();
      localStorage.setItem('token', data.token);
      setUser(data.user);
      return data;
    } catch (error) {
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setUser(null);
  }, []);

  return { user, isAuthenticated, login, logout };
};

describe('useAuth Hook', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.resetAllMocks();
  });

  it('should correctly check authentication status', () => {
    const { result } = renderHook(() => useAuth());

    act(() => {
      localStorage.setItem('token', 'test-token');
    });

    expect(result.current.isAuthenticated()).toBe(true);
  });

  it('should correctly handle login process', async () => {
    const { result } = renderHook(() => useAuth());

    const mockLoginResponse = {
      token: 'test-token',
      user: {
        id: '1',
        email: 'test@example.com',
        name: 'Test User'
      }
    };

    // Mock fetch API
    global.fetch = vi.fn().mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockLoginResponse)
      } as unknown as Response)
    );

    await act(async () => {
      await result.current.login('test@example.com', 'password');
    });

    expect(localStorage.getItem('token')).toBe('test-token');
    expect(result.current.isAuthenticated()).toBe(true);
  });
});