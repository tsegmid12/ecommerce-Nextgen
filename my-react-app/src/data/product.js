import atka9 from '../assets/a9.png'
import x8se from '../assets/x8se.png'
import qck from '../assets/qck.png'
import x1 from '../assets/x1.png'
import x68 from '../assets/x68.png'
import u2 from '../assets/u2.png'
import skysoft from '../assets/skysoft.png'
import rog from '../assets/rog.png'

const products = [
    {
        id: 1,
        image: atka9,
        name: 'ATK A9 SE 2.0',
        price: 90000,
        categore: 'mouse',
        count: 1,
        sold: 8,
        status: 'new',
        wishlist: false,
        cart: true
    },
    {
        id: 2,
        image: x8se,
        name: 'AttackShark X8SE',
        price: 75000,
        categore: 'mouse',
        count: 2,
        sold: 5,
        status: 'new',
        wishlist: false,
        cart: true
    },
    {
        id: 3,
        image: qck,
        name: 'SteelSeries QCK Heavy',
        price: 40000,
        categore: 'mousepad',
        count: 3,
        sold: 10,
        status: 'new',
        wishlist: true
    },
    {
        id: 4,
        image: x1,
        name: 'ATK X1 Ultra Max 2.0',
        price: 190000,
        categore: 'mouse',
        count: 1,
        sold: 3,
        status: 'new',
        wishlist: false
    },
    {
        id: 5,
        image: x68,
        name: 'AttackShark X68HE 2.0',
        price: 120000,
        categore: 'keyboard',
        sold: 2,
        count: 1,
        status: 'new',
        wishlist: false
    },
    {
        id: 6,
        image: u2,
        name: 'ATK U2',
        price: 135000,
        categore: 'mouse',
        count: 0,
        sold: 1,
        status: 'new',
        wishlist: false
    },
    {
        id: 7,
        image: skysoft,
        name: 'SkySoft Mousepad',
        price: 75000,
        categore: 'mousepad',
        count: 1,
        sold: 0,
        status: 'new',
        wishlist: false
    },
    {
        id: 8,
        image: rog,
        name: 'ROG Mousepad',
        price: 85000,
        categore: 'mousepad',
        count: 2,
        sold: 12,
        status: 'new',
        wishlist: true
    }
]


export default products;