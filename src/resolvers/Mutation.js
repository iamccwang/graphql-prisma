import { PubSub } from "graphql-yoga";
import uuidv4 from "uuid/v4";

const Mutation = {
    async createUser(parent, args, { db, prisma }, info) {
        return prisma.mutation.createUser({ data: args.data }, info)
    },
    async deleteUser(parent, args, { prisma }, info) {
        return prisma.mutation.deleteUser({
            where: {
                id: args.id
            }
        }, info)
    },
    async updateUser(parent, args, { prisma }, info) {
        return prisma.mutation.updateUser({
            where: {
                id: args.id
            },
            data: args.data
        }, info)
    },
    async createPost(parent, args, { prisma }, info) {
        return prisma.mutation.createPost({ 
            data: {
                title: args.data.title,
                body: args.data.body,
                published: args.data.published,
                author: {
                    connect: {
                        id: args.data.author
                    } 
                }
            }
        }, info)
    },
    async deletePost(parent, args, { prisma }, info) {
        return prisma.mutation.deletePost({ 
            where: {
                id: args.id
            }
         }, info)
    },
    async updatePost(parent, args, { prisma }, info) {
        return prisma.mutation.updatePost({
            where: {
                id: args.id
            },
            data: args.data
        }, info)
    },
    async createComment(parent, args, { prisma }, info) {
        return prisma.mutation.createComment({
            data: {
                text: args.data.text,
                post: {
                    connect: {
                        id: args.data.post
                    }
                },
                author: {
                    connect: {
                        id: args.data.author
                    }
                }
            }
        }, info)
    },
    async deleteComment(parent, args, { prisma }, info) {
        return prisma.mutation.deleteComment({
            where: {
                id: args.id
            }
        }, info)
    },
    async updateComment(parent, args, { prisma }, info) {
        return prisma.mutation.updateComment({
            where: {
                id: args.id
            },
            data: args.data
        }, info)
    }
};

export { Mutation as default };