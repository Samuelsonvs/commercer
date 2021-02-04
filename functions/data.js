import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
            name: 'Samuel',
            email: 'admin@example.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: true,
        },
        {
            name: 'John',
            email: 'user@example.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: false,
        },
    ],
    products: [
        {
            name:'Nike Slim Shirts',
            category:'Shirts',
            image:'/images/p1.jpg',
            price:120,
            countInStock: 7,
            brand:'Nike',
            rating:4.5,
            numReviews:10,
            description:'high quality product',
        },
        {
            name:'Puma Slim Shirts',
            category:'Shirts',
            image:'/images/p1.jpg',
            price:130,
            countInStock: 5,
            brand:'Nike',
            rating:4.5,
            numReviews:10,
            description:'high quality product',
        },
        {
            name:'Adidas Slim Shirts',
            category:'Shirts',
            image:'/images/p1.jpg',
            price:140,
            countInStock: 10,
            brand:'Nike',
            rating:4.5,
            numReviews:10,
            description:'high quality product',
        },
        {
            name:'Kappa Slim Shirts',
            category:'Shirts',
            image:'/images/p1.jpg',
            price:90,
            countInStock: 0,
            brand:'Nike',
            rating:4.5,
            numReviews:10,
            description:'high quality product',
        },
        {
            name:'Umbro Slim Shirts',
            category:'Shirts',
            image:'/images/p1.jpg',
            price:180,
            countInStock: 9,
            brand:'Nike',
            rating:4.5,
            numReviews:5,
            description:'high quality product',
        },
    ],
};

export default data;