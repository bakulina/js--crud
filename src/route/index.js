// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================

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
// ================================================================
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
