const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
   var users;
   beforeEach(() => {
      users = new Users();
      users.userlist = [{
         id: '1',
         name: 'John',
         room: 'A'
      },{
         id: '2',
         name: 'Mike',
         room: 'A'
      },{
         id: '3',
         name: 'Ali',
         room: 'B'
      },{
         id: '4',
         name: 'Jerry',
         room: 'B'
      }];
   });

   it('Should add new user', () => {
      var users = new Users();
      var single_user = {
         id: '1234',
         name: 'Ali Ahad',
         room: 'A'
      };

      var response = users.add_user(single_user.id, single_user.name, single_user.room);
      expect(users.userlist).toEqual([single_user]);
   });

   it('Should return names for people in room A', () => {
      var user_list = users.get_user_list('A');
      expect(user_list).toEqual(['John', 'Mike']);
   });

   it('Should return names for people in room B', () => {
      var user_list = users.get_user_list('B');
      expect(user_list).toEqual(['Ali', 'Jerry']);
   });

   it('Should remove a user', () => {
      var user_id = '1';
      var user = users.remove_user(user_id);

      expect(user.id).toBe(user_id);
      expect(users.userlist.length).toBe(4);
   });

   it('Should not remove a user', () => {
      var user_id = '99';
      var user = users.remove_user(user_id);

      expect(user).toNotExist();
      expect(users.userlist.length).toBe(4);
   });

   it('Should find user', () =>{
      var user_id = '2';
      var user = users.get_user(user_id);

      expect(user.id).toBe(user_id);
   });

   it('Should not find a user', () => {
      var user_id = '10';
      var user = users.get_user(user_id);

      expect(user).toNotExist();
   });
});