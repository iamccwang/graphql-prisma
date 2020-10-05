import 'cross-fetch/polyfill'
import ApolloBoost, { gql } from 'apollo-boost'
import prisma from '../src/prisma'
import seedDatabase, { userOne } from './utils/seedDatabase'
import getClient from './utils/getClient'

const client = getClient()

beforeEach(seedDatabase, 10000)

test('Should create a new user', async () => {
    const createUser = gql`
        mutation {
            createUser (
                data: {
                    name: "Stanley",
                    email: "stanley@example.com",
                    password: "MyPass123"
                }
            ) {
                token,
                user {
                    id
                }
            }
        }
    `

    const response = await client.mutate({
        mutation: createUser
    })

    const exists = await prisma.exists.User({
        id: response.data.createUser.user.id
    })

    expect(exists).toBe(true)
}, 10000)

test('Should expose public author profiles', async () => {
    const getUsers = gql`
        query {
            users {
                id
                name
                email
            }
        }
    `

    const response = await client.query({
        query: getUsers
    })

    expect(response.data.users.length).toBe(1)
    expect(response.data.users[0].email).toBe(null)
    expect(response.data.users[0].name).toBe("Jen")
}, 10000)

test('Should not login with bad credentials', async () => {
    const login = gql`
        mutation {
            login (
                data: {
                    email: "jeff@example.com",
                    password: "asjdasjnd"
                }
            ) {
                token
            }
        }
    `

    await expect(
        client.mutate({ mutation: login })
    ).rejects.toThrow()
}, 10000)

test('Should not sign up user with invalid password', async () => {
    const createUser = gql`
        mutation {
            createUser (
                data: {
                    name: "Stanley",
                    email: "stanley@example.com",
                    password: "pass"
                }
            ) {
                token
            }
        }
    `

    await expect(
        client.mutate({ mutation: createUser })
    ).rejects.toThrow()
}, 10000)

test('Should fetch user profile', async () => {
    const client = getClient(userOne.jwt)

    const getProfile = gql`
        query {
            me {
                id
                name
                email
            }
        }
    `

    const { data } = await client.query({ query: getProfile })

    expect(data.me.id).toBe(userOne.user.id)
    expect(data.me.name).toBe(userOne.user.name)
    expect(data.me.email).toBe(userOne.user.email)
}, 10000)