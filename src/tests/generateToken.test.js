const jwt = require('jsonwebtoken');
const generateToken = require('../utils/generateToken');

describe('generateToken', () => {
    it('should generate a valid JWT token', () => {
        process.env.JWT_SECRET = 'testSecret';

        const token = generateToken('user123');
        
        const decoded = jwt.verify(token, 'testSecret');
        
        expect(decoded).toHaveProperty('userId', 'user123');
    });
});
