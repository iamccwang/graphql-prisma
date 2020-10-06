import 'cross-fetch/polyfill'
import prisma from '../src/prisma'
import seedDatabase, { userOne, postOne, postTwo } from './utils/seedDatabase'
import getClient from './utils/getClient'
import { getPosts,
    getMyPosts,
    updatePost,
    createPost,
    deletePost } from './utils/operations'

const client = getClient()

beforeEach(seedDatabase, 30000)

test('Should expose published posts', async () => {
    const response = await client.query({
        query: getPosts
    })

    expect(response.data.posts.length).toBe(1)
    expect(response.data.posts[0].published).toBe(true)
}, 30000)

test('Should fetch user posts', async () => {
    const client = getClient(userOne.jwt)
    const { data } = await client.query({ query: getMyPosts })

    expect(data.myPosts.length).toBe(2)
}, 30000)

test('Should be able to update own post', async () => {
    const client = getClient(userOne.jwt)
    const variables = {
        id: postOne.post.id,
        data: {
            published: false
        }
    }

    const { data } = await client.mutate( {mutation: updatePost, variables })
    const exists = await prisma.exists.Post({ id: postOne.post.id, published: false })

    expect(data.updatePost.published).toBe(false)
    expect(exists).toBe(true)
}, 30000)

test('Should create a new post', async () => {
    const client = getClient(userOne.jwt)
    const variables = {
        data: {
            title: "A test post",
            body: "",
            published: true,
        }
    }

    const { data } = await client.mutate({ mutation: createPost, variables })
    
    expect(data.createPost.title).toBe("A test post")
    expect(data.createPost.body).toBe("")
    expect(data.createPost.published).toBe(true)
}, 30000)

test('Should delete post', async () => {
    const client = getClient(userOne.jwt)
    const variables = {
        id: postTwo.post.id
    }

    await client.mutate({ mutation: deletePost, variables })
    const exists = await prisma.exists.Post({ id: postTwo.post.id })

    expect(exists).toBe(false)
}, 30000)