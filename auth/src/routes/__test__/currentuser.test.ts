import request from 'supertest'
import { app } from '../../app'

it('responds with details about the current user',async () => {
    const cookie = await global.signin()
    // if not send cookie will get empty response  🙌
    const response = await request(app)
        .get('/api/users/current-user')
        .set('Cookie', cookie[0])
        .send()
        .expect(200)

    console.log(response.body)
    expect(response.body.currentUser.email).toEqual("test@test.com")
})


it('responds with null if not authenticated',async() => {
    const response = await request(app)
        .get('/api/users/current-user')
        .send()
        .expect(200)

    expect(response.body.currentUser).toEqual(null)
})