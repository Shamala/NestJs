import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersService {
  private users = [
    { id: 1, role: 'INTERN', name: 'John', email: 'j@j.com' },
    { id: 2, role: 'ENGINEER', name: 'Jane', email: 'j@j.com' },
    { id: 3, role: 'ADMIN', name: 'Jack', email: 'j@j.com' },
    { id: 4, role: 'ADMIN', name: 'Jill', email: 'j@j.com' },
    { id: 5, role: 'ENGINEER', name: 'Joe', email: 'j@j.com' },
  ]

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role)
      if (rolesArray.length === 0)
        throw new NotFoundException('User Role Not Found')

      return rolesArray
    }
    return this.users
  }
  findOne(id: number) {
    const user = this.users.find((user) => user.id === id)
    if (!user) throw new NotFoundException('User Not Found')
    return user
  }
  create(user: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id)
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...user,
    }
    this.users.push(newUser)
    return newUser
  }
  update(id: number, updatedUser: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updatedUser }
      }
      return user
    })
    return this.findOne(id)
  }
  delete(id: number) {
    const removedUser = this.findOne(id)
    this.users = this.users.filter((user) => user.id !== id)
    return removedUser
  }
}
