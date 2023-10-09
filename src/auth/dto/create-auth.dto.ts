import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthDto {
  @IsString()
  nome: string;

  @MinLength(8, {message: 'A senha deve ter no mínimo 8 caracteres'})
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Senha muito fraca',
  })
  @IsString()
  senha: string;
}
