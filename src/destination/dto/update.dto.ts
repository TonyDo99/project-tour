import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateDestinationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  slug: string;
}
