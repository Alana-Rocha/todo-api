import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  login(authDto: AuthDto) {
    if(!authDto.nome || !authDto.senha ) throw new BadRequestException('Nome e senha são obrigatórios');
    
  }

  cadastro(authDto: AuthDto) {
    
  }
}
