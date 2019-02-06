[{
   id: '/#12poiajdspfoif',
   name: 'Andrew',
   room: 'The Office Fans'
 }]
 
 // addUser(id, name, room)
 // removeUser(id)
 // getUser(id)
 // getUserList(room)
 
 class Users {
   constructor () {
     this.users = [];
   }
   add_user (id, name, room) {
     var user = {id, name, room};
     this.users.push(user);
     return user;
   }
   remove_user (id) {
     var user = this.get_user(id);
 
     if (user) {
       this.users = this.users.filter((user) => user.id !== id);
     }
 
     return user;
   }
   get_user (id) {
     return this.users.filter((user) => user.id === id)[0]
   }
   get_user_list (room) {
     var users = this.users.filter((user) => user.room === room);
     var namesArray = users.map((user) => user.name);
 
     return namesArray;
   }
 }
 
 module.exports = {Users};
