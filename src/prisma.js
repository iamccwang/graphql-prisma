import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466'
})

const createPostForUser = async (authorId, data) => {
    const userExists = await prisma.exists.User({ id: authorId })

    if (!userExists) {
        throw new Error('User not found')
    }

    const post = await prisma.mutation.createPost({
        data: {
            ...data,
            author: {
                connect: {
                    id: authorId
                }
            }
        }
    }, '{ author { id name email posts { id title body published } } }')

    return post.author
}

// createPostForUser('ckfme0atv007g0799y9kapco1', {
//     title: "Great Art",
//     body: "Great Artist",
//     published: false
// }).then((user) => {
//     console.log(JSON.stringify(user, undefined, 2))
// }).catch((error) => {
//     console.log(error.message);
// })

const updatePostForUser = async (postId, data) => {
    const postExists = await prisma.exists.Post({
        id: postId
    })

    if (!postExists) {
        throw new Error('Post not found')
    }

    const post = await prisma.mutation.updatePost({
        data,
        where: {
            id: postId
        }
    }, '{ author { id name email posts { id title body published } } }')

    return post.author
}

// updatePostForUser("ckfnmzgi3000k0899etig1puz", { 
//     published: true 
// }).then((user) => {
//     console.log(JSON.stringify(user, undefined, 2))
// }).catch((error) => {
//     console.log(error.message)
// })
