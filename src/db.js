const users = [{
    id: '1',
    name: 'Stanley',
    email: 'stanley@mail.com',
    age: 27    
}, {
    id: '2',
    name: 'Sam',
    email: 'sam@mail.com',
    age: 27    
}, {
    id: '3',
    name: 'Ice',
    email: 'ice@mail.com',
    age: 27    
}];

const posts = [{
    id: '1',
    title: 'Title A 1',
    body: 'Body A 1',
    published: true,
    author: '1'
}, {
    id: '2',
    title: 'Title B 2 ',
    body: 'Body B 2',
    published: false,
    author: '1'    
}, {
    id: '3',
    title: 'Title C 3',
    body: 'Body C 3',
    published: true,
    author: '2'
}];

const comments = [{
    id: '102',
    text: 'I like it',
    author: '1',
    post: '3'
}, {
    id: '103',
    text: 'Awesome!!!',
    author: '2',
    post: '1'
}, {
    id: '104',
    text: 'It is useful',
    author: '2',
    post: '2'
}, {
    id: '105',
    text: 'I got it work',
    author: '3',
    post: '1'
}];

const db = {
    users,
    posts,
    comments
};

export { db as default };