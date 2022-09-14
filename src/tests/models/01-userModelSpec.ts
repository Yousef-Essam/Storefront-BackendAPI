import { User, UserStore } from '../../models/user'

const store = new UserStore;

describe('User Model Testing', () => {
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

    describe('Basic User Model Testing', async () => {
        it('create method of the model should add a user', async (done) => {
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
            done()
        });
    
        it('read method of the model should return a list of users', async (done) => {
            const result = await store.read(['id', 'firstname', 'lastname'])
            
            expect(result).toEqual([
                {
                    id: 1,
                    firstname: 'Yousef',
                    lastname: 'Essam'
                }
            ]);
            done()
        });
    
        it('update method of the model should update the user name', async (done) => {
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
            done()
        });
    
        it('delete method of the model should delete empty the table', async (done) => {
            await store.delete()
            const result = await store.read('*')
            
            expect(result).toEqual([]);
            done()
        });

        it('should add a user for testing other models and handlers testing', async (done) => {
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
                id: 2,
                firstname: 'Yousef',
                lastname: 'Essam'
            });
            done()
        });
    })
})