// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================

class User {
  static #userList = []
  constructor(login, email, password) {
    this.login = login
    this.email = email
    this.password = password
    this.id = new Date().getTime()
  }
  static addUser = (user) => {
    this.#userList.push(user)
  }
  static getUserList = () => this.#userList

  static getUserById = (id) =>
    this.#userList.find((element) => element.id === id)

  static deleteUser = (id) => {
    const index = this.#userList.findIndex(
      (value) => value.id === id,
    )
    this.#userList.splice(index, 1)
  }
  static updateUser = (id, data) => {
    const user = this.getUserById(id)
    const { email } = data

    if (user) {
      if (email) {
        user.email = email
      }

      return true
    } else {
      return false
    }
  }
}
// ================================================================

router.get('/', function (req, res) {
  const list = User.getUserList()
  res.render('index', {
    style: 'index',
    data: {
      users: {
        list,
        isEmpty: list.length === 0,
      },
    },
  })
})
// ================================================================
router.post('/user-create', function (req, res) {
  const { login, email, password } = req.body
  const user = new User(login, email, password)
  User.addUser(user)
  res.render('user-create', {
    style: 'user-create',
  })
})
// ================================================================
router.get('/user-delete', function (req, res) {
  const { id } = req.query
  User.deleteUser(id)
  res.render('user-delete', {
    style: 'user-delete',
  })
})
// ================================================================
router.post('/user-update', function (req, res) {
  const { email, password, id } = req.body

  User.updateUser(Number(id), { email })

  res.render('user-update', {
    style: 'user-update',
  })
})

// Підключаємо роутер до бек-енду
module.exports = router
