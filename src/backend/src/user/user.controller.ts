import { Controller, Get, Post, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateRolesDto } from './dto/update-roles.dto';
import { UserService } from './user.service';

@Controller('admin/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Patch(':id/roles')
  updateRoles(@Param('id') id: string, @Body() updateRolesDto: UpdateRolesDto) {
    return this.userService.updateRoles(id, updateRolesDto.roles);
  }
}