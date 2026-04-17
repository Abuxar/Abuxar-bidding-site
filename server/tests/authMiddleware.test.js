const { protect, authorize } = require('../middleware/authMiddleware');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

jest.mock('jsonwebtoken');
jest.mock('../models/userModel');

describe('Auth Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = { headers: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  describe('protect', () => {
    it('should call next if token is valid', async () => {
      req.headers.authorization = 'Bearer validtoken';
      jwt.verify.mockReturnValue({ id: 'user123' });
      User.findById.mockReturnValue({
        select: jest.fn().mockResolvedValue({ _id: 'user123', role: 'Bidder' })
      });

      await protect(req, res, next);
      expect(next).toHaveBeenCalled();
    });

    it('should return 401 if no token provided', async () => {
      await protect(req, res, next);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Not authorized, no token' });
    });
  });

  describe('authorize', () => {
    it('should call next if user role is authorized', () => {
      req.user = { role: 'Admin' };
      const middleware = authorize('Admin', 'Seller');
      middleware(req, res, next);
      expect(next).toHaveBeenCalled();
    });

    it('should return 403 if user role is unauthorized', () => {
      req.user = { role: 'Bidder' };
      const middleware = authorize('Admin', 'Seller');
      middleware(req, res, next);
      expect(res.status).toHaveBeenCalledWith(403);
    });
  });
});
