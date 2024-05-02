// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================


class Product {
  static #list = []
  static #count = 0
  constructor(img, title, description, price, category) {
    this.id = ++Product.#count
    this.img = img
    this.title = title
    this.description = description
    this.price = price
    this.category = category
  }
  static add = (
    img,
    title,
    description,
    price,
    category,
  ) => {
    const newProduct = new Product(
      img,
      title,
      description,
      price,
      category,
    )
    this.#list.push(newProduct)
  }
  static getList = () => {
    return this.#list
  }
  static getById = (id) => {
    return this.#list.find((product) => product.id === id)
  }
  static getRandomList = (id) => {
    const filteredList = this.#list.filter(
      (product) => product.id !== id,
    )
    const shuffLedlist = filteredList.sort(
      () => Math.random() - 0.5,
    )
    return shuffLedlist.slice(0, 3)
  }
}
// ================================================================

router.get('/purchase-index', function (req, res) {
  res.render('purchase-index', {
    style: 'purchase-index',
    data: {
      img: 'https://picsum.photos/200/300',
      title:
        "Комп'ютер Artline Gaming(X43v31) AMD Ryzen 5 3600",
      description:
        'AMD Ryzen 5 3600 (3.6 - 4.2 ГГц) / RAM 16 ГБ / HDD 1 ТБ + SSD 480 ГБ / nVidia GeForce RTX 3050, 8 ГБ / без ОД / LAN / без ОС',
      category: [
        { id: 1, text: 'готовий до відправки' },
        { id: 2, text: 'топ продажів' },
      ],
      price: 27000,







   


 

Product.add(
  'https://picsum.photos/200/300',
  "Комп'ютер Artline Gaming(X43v31) AMD Ryzen 5 3600",
  'AMD Ryzen 5 3600 (3.6 - 4.2 ГГц) / RAM 16 ГБ / HDD 1 ТБ + SSD 480 ГБ / nVidia GeForce RTX 3050, 8 ГБ / без ОД / LAN / без ОС',
  [{ id: 2, text: 'топ продажів' }],
  20000,
)
Product.add(
  'https://picsum.photos/200/300',
  "Комп'ютер Artline Gaming(X43v31) AMD Ryzen 5 3600",
  'AMD Ryzen 5 3600 (3.6 - 4.2 ГГц) / RAM 16 ГБ / HDD 1 ТБ + SSD 480 ГБ / nVidia GeForce RTX 3050, 8 ГБ / без ОД / LAN / без ОС',
  [{ id: 1, text: 'готовий до відправки' }],
  21000,
)
Product.add(
  'https://picsum.photos/200/300',
  "Комп'ютер Artline Gaming(X43v31) AMD Ryzen 5 3600",
  'AMD Ryzen 5 3600 (3.6 - 4.2 ГГц) / RAM 16 ГБ / HDD 1 ТБ + SSD 480 ГБ / nVidia GeForce RTX 3050, 8 ГБ / без ОД / LAN / без ОС',
  [{ id: 2, text: 'топ продажів' }],
  20000,
)
// ================================================================

router.get('/purchase-index', function (req, res) {
  const id = Number(req.query.id)
  res.render('purchase-index', {
    style: 'purchase-index',
    data: {
      list: Product.getList(),
    },
  })
})

router.get('/purchase-product', function (req, res) {
  const id = Number(req.query.id)

  res.render('purchase-product', {
    style: 'purchase-product',
    data: {
      list: Product.getRandomList(id),
      product: Product.getById(id),
    },
  })
})
//==========================
router.post('/purchase-create', function (req, res) {
  const id = Number(req.query.id)
  const amout = Number(req.body.amout)
  console.log(id, amout)
  res.render('purchase-product', {
    style: 'purchase-product',
    data: {
      list: Product.getRandomList(id),
      product: Product.getById(id),
    },
router.get('/product-create', function (req, res) {
  res.render('product-create', {
    style: 'product-create',
  })
})
// ================================================================


// Підключаємо роутер до бек-енду
module.exports = router
//===================================
