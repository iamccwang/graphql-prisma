import 'cross-fetch/polyfill'
import prisma from '../src/prisma'
import seedDatabase, { userOne, postOne, commentOne, commentTwo } from './utils/seedDatabase'
import getClient from './utils/getClient'
import { deleteComment, subscribeToComments, subscribeToPosts } from './utils/operations'

const client = getClient()

beforeEach(seedDatabase, 20000)

test('Should delete own comment', async () => {
    const client = getClient(userOne.jwt)
    const variables = {
        id: commentTwo.comment.id
    }

    await client.mutate({ mutation: deleteComment, variables })
    const exists =  await prisma.exists.Comment({ id: commentTwo.comment.id })

    expect(exists).toBe(false)
}, 20000)

test('Should not delete other users comment', async () => {
    const client = getClient(userOne.jwt)
    const variables = {
        id: commentOne.comment.id
    }
    
    await expect(
        client.mutate({ mutation: deleteComment, variables })
    ).rejects.toThrow()
}, 20000)

test('Should subscribe to comments for a post', async (done) => {
    const variables = {
        postId: postOne.post.id
    }

    client.subscribe({ query: subscribeToComments, variables }).subscribe({
        next(response) {
            expect(response.data.comment.mutation).toBe('DELETED')
            done()
        }
    })

    await prisma.mutation.deleteComment({ where: { id: commentOne.comment.id } })
}, 20000)

test('Should subscribe to changes for published post', async (done) => {
    client.subscribe({ query: subscribeToPosts }).subscribe({
        next(response) {
            expect(response.data.post.mutation).toBe('DELETED')
            done()
        }
    })

    await prisma.mutation.deletePost({ where: { id: postOne.post.id } })
}, 20000)