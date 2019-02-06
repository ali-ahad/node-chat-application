const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString', () => {
   it('Should reject non-string values', () => {
      var response = isRealString(98);
      expect(response).toBe(false);
   });

   it('Should reject only white spaces', () => {
      var response = isRealString('    ');
      expect(response).toBe(false);
   })

   it('Should allow strings with non-white space characters', () => {
      var response = isRealString('My name is Ali');
      expect(response).toBe(true);
   })
});