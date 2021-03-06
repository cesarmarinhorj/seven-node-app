"use strict"

const User = use("App/Models/User")

class UserController {
  async create ({ request }) {
    const data = request.only(["username", "phone", "email", "password"])

    const user = await User.create(data)

    return user
  }

  async update({ params, request, response, auth }) {
    const user = await auth.getUser()

    if(request.only["password"]) {
      console.log("Alterando senha...");
    }

    const data = request.only(["username", "phone", "email", "password"])
    
    user.merge(data);
    await user.save();
    
    return user
  }

  async show({ auth }) {
    const user = await auth.getUser()

    return user
  }
}

module.exports = UserController