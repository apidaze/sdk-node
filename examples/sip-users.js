const { Apidaze } = require('../');

const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;

const ApidazeClient = new Apidaze(API_KEY, API_SECRET);

(async () => {
  // create a user
  const { body: createdUser } = await ApidazeClient.sipUsers.create({
    username: 'sip_account',
    name: 'SIP Account',
    email_address: 'sip@apidaze.io',
    internal_caller_id_number: '1234',
    external_caller_id_number: '123412341234'
  });
  console.log('the created user', createdUser);

  // fetch the list of users
  const { body: users } = await ApidazeClient.sipUsers.list();
  console.log('list of users', users);

  // get a user
  const { body: user } = await ApidazeClient.sipUsers.get(createdUser.id);
  console.log('the fetched user', user);

  // update a user
  const { body: updatedUser } = await ApidazeClient.sipUsers.update(createdUser.id, { name: 'New SIP Account' })
  console.log('the updated user', updatedUser);

  // get a user status
  const { body: userStatus, statusCode } = await ApidazeClient.sipUsers.getStatus(user.id);
  console.log('the user status', userStatus, statusCode);

  // reset a user's password
  const { body: password, statusCode: ss } = await ApidazeClient.sipUsers.resetPassword(user.id);
  console.log('the new password', password, ss);

  // delete a user
  const deletedUserResponse = await ApidazeClient.sipUsers.delete(createdUser.id);
  console.log('the deleted user', deletedUserResponse);
})();
