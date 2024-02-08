import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Umesh Basnet',
      email: 'umesh@test.com',
      role: 'ENGINEER',
    },
    {
      id: 2,
      name: 'Ashmi Basnet',
      email: 'ashmi@test.com',
      role: 'ADMIN',
    },
    {
      id: 3,
      name: 'Ram Thapa',
      email: 'ram@test.com',
      role: 'INTERN',
    },
    {
      id: 4,
      name: 'Luffy Monkey',
      email: 'umesh@test.com',
      role: 'ADMIN',
    },
  ];

  findAll(role?: 'INTERN' | 'ADMIN' | 'ENGINEER') {
    if (role) {
      return this.users.filter((user) => user.role == role);
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (user != null) {
      return user;
    }
    throw new NotFoundException('User not found');
  }

  createUser(user: {
    name: string;
    email: string;
    role: 'INTERN' | 'ADMIN' | 'ENGINEER';
  }) {
    const newUser = {
      id: this.users.length + 1,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(
    id: number,
    updatedUser: {
      name?: string;
      email?: string;
      role?: 'INTERN' | 'ADMIN' | 'ENGINEER';
    },
  ) {
    this.users.map((user) => {
      if (user.id == id) {
        return {
          ...user,
          ...updatedUser,
        };
      }
    });
    return this.findOne(id);
  }

  deleteUser(id: number) {
    const user = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return user;
  }
}
