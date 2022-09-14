import { User, UserStore } from '../../models/user'

const store = new UserStore;

describe('User Model Testing', async () => {
    describe('Checking the existence of model methods', () => {
        it('should have a create method', () => {
            expect(store.create).toBeDefined();
        })
    
        it('should have a read method', () => {
            expect(store.read).toBeDefined();
        })
    
        it('should have an update method', () => {
            expect(store.update).toBeDefined();
        })
    
        it('should have a delete method', () => {
            expect(store.delete).toBeDefined();
        })
    })

    describe('Basic User Model Testing', () => {
        it('create method of the model should add a user', async () => {
            const result = await store.create({
                firstname: 'Yousef',
                lastname: 'Essam',
                password: 'password123'
            });
    
            expect({
                id: result.id,
                firstname: 'Yousef',
                lastname: 'Essam'
            }).toEqual({
                id: 1,
                firstname: 'Yousef',
                lastname: 'Essam'
            });
        });
    
        it('read method of the model should return a list of users', async () => {
            const result = await store.read(['id', 'firstname', 'lastname'])
            
            expect(result).toEqual([
                {
                    id: 1,
                    firstname: 'Yousef',
                    lastname: 'Essam'
                }
            ]);
        });
    
        it('update method of the model should update the user name', async () => {
            const result = await store.update({firstname: 'Ahmed'}, {id: 1})
            
            expect({
                id: result[0].id,
                firstname: result[0].firstname,
                lastname: result[0].lastname
            }).toEqual({
                id: 1,
                firstname: 'Ahmed',
                lastname: 'Essam'
            });
        });
    
        it('delete method of the model should delete empty the table', async () => {
            await store.delete()
            const result = await store.read('*')
            
            expect(result).toEqual([]);
        });
    })
})