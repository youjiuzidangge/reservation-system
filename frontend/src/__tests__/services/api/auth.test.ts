import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';

// Assumed implementation of auth service
const login = async (email: string, password: string) => {
  const response = await axios.post('/auth/login', { email, password });
  return response.data;
};

vi.mock('axios');

describe('Auth Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('login', () => {
    it('should successfully login and return token and user info', async () => {
      const mockResponse = {
        data: {
          token: 'test-token',
          user: {
            id: '1',
            email: 'test@example.com',
            name: 'Test User',
            role: 'guest'
          }
        }
      };
      vi.mocked(axios.post).mockResolvedValueOnce(mockResponse);

      const result = await login('test@example.com', 'password');
      
      expect(vi.mocked(axios.post)).toHaveBeenCalledWith('/auth/login', {
        email: 'test@example.com',
        password: 'password'
      });
      expect(result).toEqual(mockResponse.data);
    });

    it('should handle login failure', async () => {
      vi.mocked(axios.post).mockRejectedValueOnce(new Error('Invalid credentials'));
      
      await expect(login('test@example.com', 'wrong-password'))
        .rejects.toThrow('Invalid credentials');
    });
  });
});