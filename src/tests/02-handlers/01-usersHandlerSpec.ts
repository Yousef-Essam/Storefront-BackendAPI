import app from '../../server'
import supertest from 'supertest'
import TokenStore from '../assets/TokenStore'

const token = new TokenStore()
const request = supertest(app)

describe('Testing Users Endpoints', () => {
    describe('Testing the Create Endpoint', () => {
        it('should create the user successfully', async () => {
            const response = await request.post('/users').send({
                firstname: 'User1',
                lastname: 'Biden',
                password: 'qwerty123',
            })
            expect(response.status).toBe(200)
            expect(response.body.id).toBe(3)
        })

        it('should fail for requiring the firstname', async () => {
            const response = await request
                .post('/users')
                .send({ lastname: 'Biden', password: 'asdfgh456' })
            expect(response.status).toBe(400)
        })

        it('should fail for requiring the lastname', async () => {
            const response = await request
                .post('/users')
                .send({ firstname: 'User2', password: 'asdfgh456' })
            expect(response.status).toBe(400)
        })

        it('should fail for requiring the password', async () => {
            const response = await request
                .post('/users')
                .send({ firstname: 'User2', lastname: 'Biden' })
            expect(response.status).toBe(400)
        })

        it('should fail for requiring a password with 6 characters at least', async () => {
            const response = await request.post('/users').send({
                firstname: 'User2',
                lastname: 'Biden',
                password: 'asdf',
            })
            expect(response.status).toBe(400)
        })

        it('should create another user successfully', async () => {
            const response = await request.post('/users').send({
                firstname: 'User2',
                lastname: 'Biden',
                password: 'asdfgh456',
            })
            expect(response.status).toBe(200)
            expect(response.body.id).toBe(4)
        })
    })

    describe('Testing the Authentication Endpoint', () => {
        it('should fail to authenticate for requiring the firstname', async () => {
            const response = await request
                .post('/users/auth')
                .send({ lastname: 'Biden', password: 'asdfgh456' })
            expect(response.status).toBe(400)
        })

        it('should fail to authenticate for requiring the lastname', async () => {
            const response = await request
                .post('/users/auth')
                .send({ firstname: 'User2', password: 'asdfgh456' })
            expect(response.status).toBe(400)
        })

        it('should fail to authenticate for requiring the password', async () => {
            const response = await request
                .post('/users/auth')
                .send({ firstname: 'User2', lastname: 'Biden' })
            expect(response.status).toBe(400)
        })

        it('should fail to authenticate for wrong username', async () => {
            const response = await request.post('/users/auth').send({
                firstname: 'Bla',
                lastname: 'bla',
                password: 'qwerty',
            })
            expect(response.status).toBe(401)
        })

        it('should fail to authenticate for wrong password', async () => {
            const response = await request.post('/users/auth').send({
                firstname: 'User2',
                lastname: 'Biden',
                password: 'qwerty',
            })
            expect(response.status).toBe(401)
        })

        it('should authenticate successfully', async () => {
            const response = await request.post('/users/auth').send({
                firstname: 'Yousef',
                lastname: 'Essam',
                password: 'password123',
            })
            expect(response.status).toBe(200)
            expect(response.body.id).toBe(2)

            token.exportToken(response.body.token)
        })
    })

    describe('Testing the Index (Show All Users) Endpoint', () => {
        it('should fail because Authorization Token is required', async () => {
            const response = await request.get('/users')
            expect(response.status).toBe(401)
        })

        it('should fail because Authorization Token is invalid', async () => {
            const response = await request
                .get('/users')
                .set('Authorization', 'Bearer ' + 'Blabla')
            expect(response.status).toBe(401)
        })

        it('should show all the users successfully', async () => {
            const response = await request
                .get('/users')
                .set('Authorization', 'Bearer ' + (await token.importToken()))
            expect(response.status).toBe(200)
            expect(response.body).toEqual([
                {
                    id: 2,
                    firstname: 'Yousef',
                    lastname: 'Essam',
                },
                {
                    id: 3,
                    firstname: 'User1',
                    lastname: 'Biden',
                },
                {
                    id: 4,
                    firstname: 'User2',
                    lastname: 'Biden',
                },
            ])
        })
    })

    describe('Testing the Show Certain User Endpoint', () => {
        it('should fail because Authorization Token is required', async () => {
            const response = await request.get('/users/2')
            expect(response.status).toBe(401)
        })

        it('should fail because Authorization Token is invalid', async () => {
            const response = await request
                .get('/users/2')
                .set('Authorization', 'Bearer ' + 'Blabla')
            expect(response.status).toBe(401)
        })

        it('should show the user of id 2 successfully', async () => {
            const response = await request
                .get('/users/2')
                .set('Authorization', 'Bearer ' + (await token.importToken()))
            expect(response.status).toBe(200)
            expect(response.body).toEqual({
                firstname: 'Yousef',
                lastname: 'Essam',
            })
        })

        it('should show the user of id 4 successfully', async () => {
            const response = await request
                .get('/users/4')
                .set('Authorization', 'Bearer ' + (await token.importToken()))
            expect(response.status).toBe(200)
            expect(response.body).toEqual({
                firstname: 'User2',
                lastname: 'Biden',
            })
        })
    })
})
