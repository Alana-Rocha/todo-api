import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/create-auth.dto';
import { compareSync, hashSync } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async login(authDto: AuthDto) {
    const usuario = await this.prisma.usuarios.findUnique({
      where: { usr_nome: authDto.nome },
    });

    if (!usuario) {
      throw new BadRequestException('Usuário não cadastrado');
    }

    const senhaValida = compareSync(authDto.senha, usuario.usr_senha);
    if (!senhaValida) {
      throw new BadRequestException('Senha inválida');
    }

    const payload = {
      nome: usuario.usr_nome,
    };

    return { token: this.jwtService.sign(payload), payload };
  }

  async cadastro(authDto: AuthDto) {
    const usuario = await this.prisma.usuarios.findUnique({
      where: { usr_nome: authDto.nome },
    });

    if (usuario) {
      throw new BadRequestException('Usuário já existe');
    }
    const usuarioCadastrado = await this.prisma.usuarios.create({
      data: { usr_nome: authDto.nome, usr_senha: hashSync(authDto.senha, 10) },
    });

    const payload = {
      nome: usuarioCadastrado.usr_nome,
    };

    return { token: this.jwtService.sign(payload), payload };
  }
}
