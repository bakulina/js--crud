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
    this.category = category
    this.price = price
  }
  static add = (
    img,
    title,
    description,
    category,
    price,
  ) => {
    const newProduct = new Product(
      img,
      title,
      description,
      category,
      price,
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

router.get('/purchase-index', function (req, res) {
  const id = Number(req.query.id)
  res.render('purchase-index', {
    style: 'purchase-index',
    data: {
      list: Product.getList(),
    },
  })
})
// ================================================================

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
  [{ id: 3, text: 'топ продажів' }],
  20000,
)
// ================================================================

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
router.post('/product-create', function (req, res) {
  const { name, price, description } = req.body
  const product = new Product(name, price, description)
  Product.addProduct(product)
  res.render('product-alert', {
    style: 'product-alert',
    info: 'Товар був успішно створений',
  })
})
// ================================================================
router.get('/product-delete', function (req, res) {
  const { id } = req.query
  Product.deleteProduct(Number(id))
  res.render('product-alert', {
    style: 'product-alert',
    info: 'Товар був успішно видалений',
  })
})
// ================================================================
router.post('/product-edit', function (req, res) {
  const { name, price, description, id } = req.body
  Product.updateProduct(Number(id), { price })
  res.render('product-alert', {
    style: 'product-alert',
    info: 'Товар був успішно оновлений',

  })
})
// Підключаємо роутер до бек-енду
module.exports = router
//===================================
