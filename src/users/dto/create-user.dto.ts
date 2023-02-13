import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ nullable: false, type: String })
  name: string;

  @ApiProperty({ nullable: false, type: String })
  username: string;

  @ApiProperty({ nullable: false, type: String })
  password: string;

  @ApiProperty({ nullable: false, type: String, default: 'User' })
  profile: string;
}
