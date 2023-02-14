import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schema/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  async create(dto: CreateUserDto) {
    try {
      const user = await this.userModel.create(dto);
      await user.save();
      return user;
    } catch (error) {
      throw new HttpException('Error creating a user', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      const user = await this.userModel.find();
      return user;
    } catch (error) {
      throw new HttpException(
        'Error finding all users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.userModel.findOne({ where: { id: id } });
      if (!user)
        throw new HttpException('Error user not found', HttpStatus.NOT_FOUND);
      return user;
    } catch (error) {
      throw new HttpException(
        `Error to find a user with id: ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userModel.findById({ _id: id });
      if (!user)
        throw new HttpException('Error user not found', HttpStatus.NOT_FOUND);
      await this.userModel.findByIdAndUpdate(id, updateUserDto);
      return { message: 'User updated successfully.' };
    } catch (error) {
      throw new HttpException(
        `Error to update a user with id: ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async remove(id: string) {
    try {
      const user = await this.userModel.findById({ _id: id });
      if (!user)
        throw new HttpException('Error user not found', HttpStatus.NOT_FOUND);
      await this.userModel.findByIdAndDelete(id);
      return { message: 'User deleted successfully.' };
    } catch (error) {
      throw new HttpException(
        `Error to deleted a user with id: ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
