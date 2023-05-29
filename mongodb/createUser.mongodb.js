//My db
use('MoveFitt');

 db.Users.insertOne(
    {
        email: 'test2@gmail.com',
        firstName: 'test2Name',
        lastName: 'test2LastName',
        category: 'user',
        createdAt: 'dateTest2',

    }
) 