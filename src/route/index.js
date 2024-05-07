// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================

class Product {
  static #list = []
  static #count = 0
  constructor(
    img,
    title,
    description,
    category,
    price,
    amount = 0,
  ) {
    this.id = ++Product.#count
    this.img = img
    this.title = title
    this.description = description
    this.category = category
    this.price = price
    this.amount = amount
  }
  static add = (...data) => {
    const newProduct = new Product(...data)
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
Product.add(
  'https://picsum.photos/200/300',
  "Комп'ютер Artline Gaming(X43v31) AMD Ryzen 5 3600",
  'AMD Ryzen 5 3600 (3.6 - 4.2 ГГц) / RAM 16 ГБ / HDD 1 ТБ + SSD 480 ГБ / nVidia GeForce RTX 3050, 8 ГБ / без ОД / LAN / без ОС',
  [{ id: 2, text: 'топ продажів' }],
  20000,
  10,
)
Product.add(
  'https://picsum.photos/200/300',
  "Комп'ютер Artline Gaming(X43v31) AMD Ryzen 5 3600",
  'AMD Ryzen 5 3600 (3.6 - 4.2 ГГц) / RAM 16 ГБ / HDD 1 ТБ + SSD 480 ГБ / nVidia GeForce RTX 3050, 8 ГБ / без ОД / LAN / без ОС',
  [{ id: 1, text: 'готовий до відправки' }],
  21000,
  10,
)
Product.add(
  'https://picsum.photos/200/300',
  "Комп'ютер Artline Gaming(X43v31) AMD Ryzen 5 3600",
  'AMD Ryzen 5 3600 (3.6 - 4.2 ГГц) / RAM 16 ГБ / HDD 1 ТБ + SSD 480 ГБ / nVidia GeForce RTX 3050, 8 ГБ / без ОД / LAN / без ОС',
  [{ id: 3, text: 'топ продажів' }],
  20000,
  10,
)
class Purchase {
  static DELIVERY_PRICE = 150
  static #count = 0
  static #list = []
  constructor(data, product) {
    this.id = ++Purchase.#count
    this.firstname = data.firstname
    this.lastname = data.lastname
    this.phone = data.phone
    this.email = data.email
    this.comment = data.comment || null
    this.bonus = data.bonus || 0
    this.promocode = data.promocode || null
    this.totalPrice = data.totalPrice
    this.productPrice = data.productPrice
    this.deliveryPrice = data.deliveryPrice
    this.amount = data.amount
    this.product = product
  }
  static add = (...arg) => {
    const newPurchase = new Purchase(...arg)
    this.#list.push(newPurchase)
    return newPurchase
  }
  static getList = () => {
    return Purchase.#list.reverse()
  }
  static getById = (id) => {
    return Purchase.#list.find((item) => item.id === id)
  }
  static updateById = (id, data) => {
    const purchase = Purchase.getById(id)

    if (purchase) {
      if (data.firstname)
        purchase.firstname = data.firstname
      if (data.lastname) purchase.lastname = data.lastname
      if (data.phone) purchase.phone = data.phone
      if (data.email) purchase.email = data.email
      return true
    } else {
      return false
    }
  }
}
class Promocode {
  static #list = []
  constructor(name, factor) {
    this.name = name
    this.factor = factor
  }
  static add = (name, factor) => {
    const newPromoCode = new Promocode(name, factor)
    Promocode.#list.push(newPromoCode)
    return newPromoCode
  }
  static getByName = (name) => {
    return this.#list.find((promo) => promo.name === name)
  }
  static calc = (promo, price) => {
    return price * promo.factor
  }
}
Promocode.add('SUMMER2023', 0.9)
Promocode.add('DISCOUNT60', 0.5)
Promocode.add('SALE', 0.75)

router.get('/', function (req, res) {
  res.render('purchase-index', {
    style: 'purchase-index',
    data: {
      list: Product.getList(),
    },
  })
})
// ================================================================

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
  const amount = Number(req.body.amount)
  if (amount < 1) {
    return res.render('allert', {
      style: 'allert',
      data: {
        message: 'Помилка',
        info: 'Некоректна кількість товару',
        link: '/purchase-product?id=${id}',
      },
    })
  }
  const product = Product.getById(id)

  if (product.amount < 1) {
    return res.render('allert', {
      style: 'allert',
      data: {
        message: 'Помилка',
        info: 'Такого кількості товару нема в налічіі',
        link: '/purchase-product?=${id}',
      },
    })
  }
  console.log(product, amount)

  const productPrice = product.price * amount
  const totalPrice = productPrice + Purchase.DELIVERY_PRICE

  res.render('purchase-create', {
    style: 'purchase-create',
    data: {
      id: product.id,
      cart: [
        {
          text: `${product.title}(${amount}шт)`,
          price: productPrice,
        },
        {
          text: `Доставка`,
          price: Purchase.DELIVERY_PRICE,
        },
      ],
      totalPrice,
      productPrice,
      deliveryPrice: Purchase.DELIVERY_PRICE,
      amount,
    },
  })
})
router.post('/purchase-submit', function (req, res) {
  const id = Number(req.query.id)
  let {
    totalPrice,
    productPrice,
    deliveryPrice,
    amount,

    firstname,
    lastname,
    email,
    phone,
    promocode,
  } = req.body

  const product = Product.getById(id)
  if (!product) {
    return res.render('allert', {
      data: {
        message: 'Помилка',
        info: 'Товар не знайдено',
        link: '/purchase-list',
      },
    })
  }

  if (product.amount < amount) {
    return res.render('allert', {
      style: 'allert',
      data: {
        message: 'Помилка',
        info: 'Товару нема в потрібній кількості',
        link: '/purchase-list',
      },
    })
  }
  totalPrice = Number(totalPrice)
  productPrice = Number(productPrice)
  deliveryPrice = Number(deliveryPrice)
  amount = Number(amount)
  if (
    isNaN(totalPrice) ||
    isNaN(productPrice) ||
    isNaN(deliveryPrice) ||
    isNaN(amount)
  ) {
    return res.render('allert', {
      style: 'allert',
      data: {
        message: 'Помилка',
        info: 'Некоректні дані',
        link: '/purchase-list',
      },
    })
  }
  if (!firstname || !lastname || !email || !phone) {
    return res.render('allert', {
      style: 'allert',
      data: {
        message: 'Заповніть обов.язкові поля',
        info: 'Некоректні дані',
        link: '/purchase-list',
      },
    })
  }

  if (promocode) {
    promocode = Promocode.getByName(promocode)
    if (promocode) {
      totalPrice = Promocode.calc(promocode, totalPrice)
    }
  }
  const purchase = Purchase.add(
    {
      totalPrice,
      productPrice,
      deliveryPrice,
      amount,
      firstname,
      lastname,
      email,
      phone,
      promocode,
    },
    product,
  )
  console.log(purchase)

  res.render('allerrt', {
    style: 'allert',
    data: {
      message: 'успішно',
      info: 'Замовлення створено',
      link: '/purchase-list',
    },
  })
})
// ================================================================

module.exports = router
//===================================
