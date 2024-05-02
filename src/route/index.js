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
============================================================
// class User {
//   static #userList = []
//   constructor(login, email, password) {
//     this.login = login
//     this.email = email
//     this.password = password
//     this.id = new Date().getTime()
//   }
//   static addUser = (user) => {
//     this.#userList.push(user)
//   }
//   static getUserList = () => this.#userList

//   static getUserById = (id) =>
//     this.#userList.find((element) => element.id === id)

//   static deleteUser = (id) => {
//     const index = this.#userList.findIndex(
//       (value) => value.id === id,
//     )
//     this.#userList.splice(index, 1)
//   }
//   static updateUser = (id, data) => {
//     const user = this.getUserById(id)
//     const { email } = data

//     if (user) {
//       if (email) {
//         user.email = email
//       }

//       return true
//     } else {
//       return false
//     }
//   }
// }
// // ================================================================

// router.get('/', function (req, res) {
//   const list = User.getUserList()
//   res.render('index', {
//     style: 'index',
//     data: {
//       users: {
//         list,
//         isEmpty: list.length === 0,
//       },
//     },
//   })
// })
// // ================================================================
// router.post('/user-create', function (req, res) {
//   const { login, email, password } = req.body
//   const user = new User(login, email, password)
//   User.addUser(user)
//   res.render('user-create', {
//     style: 'user-create',
//   })
// })
// // ================================================================
// router.get('/user-delete', function (req, res) {
//   const { id } = req.query
//   User.deleteUser(id)
//   res.render('user-delete', {
//     style: 'user-delete',
//   })
// })
// // ================================================================
// router.post('/user-update', function (req, res) {
//   const { email, password, id } = req.body

//   User.updateUser(Number(id), { email })

//   res.render('user-update', {
//     style: 'user-update',
//   })
// })
//====================================

// ================================================================
class Product {
  static #productList = []
  constructor(name, price, description) {
    let num = Math.trunc(Math.random() * 10000000000)
    this.name = name
    this.price = price
    this.description = description
    if (num.length !== 9) {
      num = Math.trunc(Math.random() * 10000000000)
      this.id = num
    } else {
      this.id = num
    }
    this.createDate = new Date().toISOString()
  }
  static addProduct = (product) =>
    this.#productList.push(product)

  static getProductList = () => this.#productList

  static getProductById = (id) =>
    this.#productList.find((element) => element.id === id)

  static deleteProduct = (id) => {
    const index = this.#productList.findIndex(
      (value) => value.id === id,
    )
    this.#productList.splice(index, 1)
  }
  static updateProduct = (id, data) => {
    const product = this.getProductById(id)
    const { price } = data

    if (product) {
      if (price) {
        product.price = price
      }

      return true
    } else {
      return false
    }
  }
}
// ================================================================
router.get('/', function (req, res) {
  res.render('index', {
    style: 'index',
  })
})
// ================================================================
router.get('/product-edit', function (req, res) {
  const { id } = req.query

  const product = Product.getProductById(Number(id))

  console.log(product)

  if (product) {
    // ↙️ cюди вводимо назву файлу з сontainer
    return res.render('product-edit', {
      // вказуємо назву папки контейнера, в якій знаходяться наші стилі
      style: 'product-edit',

      data: {
        name: product.name,
        price: product.price,
        id: product.id,
        description: product.description,
      },
    })
  } else {
    return res.render('product-alert', {
      // вказуємо назву папки контейнера, в якій знаходяться наші стилі
      style: 'product-alert',
      info: 'Продукту за таким ID не знайдено',
    })
  }
})
// ================================================================
router.get('/product-list', function (req, res) {
  const list = Product.getProductList()
  res.render('product-list', {
    style: 'product-list',
    data: {
      products: {
        list,
        isEmpty: list.length === 0,
      },

    },
  })
})
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
