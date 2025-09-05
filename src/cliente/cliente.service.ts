import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { EntityManager, Repository } from 'typeorm';
import { UsuarioService } from 'src/usuario/usuario.service';
import { CreateUsuarioClienteDto } from 'src/common/create-usuario-cliente.dto';
import { RangoFechasDto } from 'src/detalle-factura/dto/reportes/rango-fechas.dto';
import * as bcrypt from 'bcrypt';
import { Usuario } from 'src/usuario/entities/usuario.entity';

type SpResponse = {
  success: boolean,
  message: string,
  idCliente?: number
}


@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
    private usuarioService: UsuarioService,
    private entityManager: EntityManager,
  ) { }

  async create(createUsuarioClienteDto: CreateUsuarioClienteDto) {
    console.log(
      '[2] DTO recibido de AuthService: ',
      JSON.stringify(createUsuarioClienteDto, null, 2),
    );

    try {
      return await this.entityManager.transaction(
        async (transactionalEntityManager) => {
          //creacion de usuario

          const usuarioData = createUsuarioClienteDto.usuario;

          const usuario = await this.usuarioService.create(usuarioData);

          //ahora crear cliente
          const cliente = this.clienteRepository.create({
            ...createUsuarioClienteDto.cliente,
            usuario: { idUsuario: usuario.idUsuario },
          });

          const savedCliente = await transactionalEntityManager.save(cliente);

          //retornar respuesta
          return {
            cliente: savedCliente,
            usuario: {
              idUsuario: usuario.idUsuario,
              email: usuario.email,
            },
            message: 'Registro completado exitosamente',
          };
        },
      );
    } catch (error) {
      console.error('Error en createUsuarioCliente: ', error);
      throw new InternalServerErrorException('Error al registrar el cliente');
    }
  }

  async createSp(createUsuarioClienteDto: CreateUsuarioClienteDto): Promise<SpResponse> {
    try {
      const { usuario, cliente } = createUsuarioClienteDto;

      let hashedPassword: string | null = null;
      hashedPassword = await bcrypt.hash(usuario.password, 10);

      //const result = 
      await this.clienteRepository.query(
        `CALL sp_CrearUsuarioCliente(?, ?, ?, ?, ?, ?, ?, ?, ?, @resultado, @mensaje)`,
        [
          usuario.email,
          hashedPassword,
          cliente.mayorista,
          cliente.nombre,
          cliente.apellido,
          cliente.nit,
          cliente.direccion,
          cliente.telefono,
          cliente.idMunicipio,
        ]
      );

      const [output] = await this.clienteRepository.query(
        'SELECT @resultado AS resultado, @mensaje AS mensaje'
      );

      console.log('Resultado del SP: ', output);

      const success = output?.resultado === 1 || output?.resultado === '1';

      if (success) {
        const clienteCreado = await this.clienteRepository
          .createQueryBuilder('cliente')
          .innerJoinAndSelect('cliente.usuario', 'usuario')
          .where('usuario.email = :email', { email: usuario.email })
          .getOne();

        return {
          success: true,
          message: output.mensaje || 'Usuario-cliente creado exitosamente',
          idCliente: clienteCreado?.idCliente
        }
      } else {
        return {
          success: false,
          message: output?.mensaje
        };
      }
    } catch (error) {
      return {
        success: false as false,
        message: `Error al ejecutar el procedimiento almacenado: ${error.message}`
      };
    }
  }

  async findAll() {
    //const clientes = await this.clienteRepository.find();

    /*return clientes.map(cliente => {
      return {
        id: cliente.idCliente,
        name: cliente.nombre
      }
    });*/

    //return clientes;
    return this.clienteRepository
      .createQueryBuilder('cliente')
      .leftJoinAndSelect('cliente.usuario', 'usuario')
      .where('cliente.estadoCliente = :estado', { estado: true })
      .select([
        'cliente.idCliente',
        'cliente.nombre',
        'cliente.apellido',
        'cliente.telefono',
        'usuario.email',
      ])
      .getMany();
  }

  async findOne(idCliente: number): Promise<any> {
    const cliente = await this.clienteRepository.findOne({
      where: { idCliente },
      relations: ['usuario', 'usuario.rol'], // Esto carga la relación con usuario
      select: {
        idCliente: true,
        nombre: true,
        apellido: true,
        nit: true,
        direccion: true,
        telefono: true,
        mayorista: true,
        usuario: {
          idUsuario: true,
          email: true,
          idRol: true,
          estadoUsuario: true,
          rol: {
            idRol: true,
            nombreR: true
          }
        }
      }
    });

    if (!cliente) {
      throw new NotFoundException(`Cliente con ID ${idCliente} no encontrado`);
    }

    return {
      ...cliente,
      email: cliente.usuario?.email,
      idRol: cliente.usuario?.idRol,
      nombreRol: cliente.usuario?.rol?.nombreR,
      estadoUsuario: cliente.usuario?.estadoUsuario
    };
  }

  async findByUsuarioId(usuarioId: number) {
    const cliente = await this.clienteRepository.find({
      where: { usuario: { idUsuario: usuarioId } },
    });

    return cliente[0];
  }

  async update(id: number, updateClienteDto: UpdateClienteDto): Promise<Cliente> {
    const clienteExistente = await this.clienteRepository.findOne({
      where: { idCliente: id },
      relations: ['usuario', 'municipio']
    });

    if (!clienteExistente) {
      throw new Error(`Cliente con ID ${id} no encontrado`);
    }

    let hashedPassword: string | null = null;
    if (updateClienteDto.usuario?.password) {
      hashedPassword = await bcrypt.hash(updateClienteDto.usuario.password, 10);
    }

    const result = await this.clienteRepository.query(
      `CALL sp_ActualizarClienteParcial(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        updateClienteDto.nombre || null,
        updateClienteDto.apellido || null,
        updateClienteDto.nit || null,
        updateClienteDto.direccion || null,
        updateClienteDto.telefono || null,
        updateClienteDto.mayorista !== undefined ? updateClienteDto.mayorista : null,
        updateClienteDto.idMunicipio || null,
        updateClienteDto.usuario?.email || null,
        updateClienteDto.usuario?.estadoUsuario !== undefined ? updateClienteDto.usuario.estadoUsuario : null,
        updateClienteDto.usuario?.idRol || null,
        hashedPassword
      ]
    );

    const clienteActualizado = await this.clienteRepository.findOne({
      where: { idCliente: id },
      relations: ['usuario', 'municipio', 'usuario.rol']
    });

    if (!clienteActualizado) {
      throw new Error('No se pudo recuperar el cliente actualizado');
    }

    return clienteActualizado;
  }

  async remove(idCliente: number): Promise<{ success: boolean; message: string }> {
    try {
      const cliente = await this.clienteRepository.findOne({
        where: { idCliente: idCliente },
        relations: ['usuario'],
        select: ['idCliente']
      });

      if (!cliente) {
        return {
          success: false,
          message: `Cliente con ID ${idCliente} no encontrado`
        };
      }

      if(!cliente.usuario){
        return{
          success: false,
          message: `El cliente con ID ${idCliente} no tiene un usuario asociado`
        };
      }

      const [clienteResult, usuarioResult] = await Promise.all([
        this.clienteRepository.update(idCliente, { estadoCliente: false}),
        this.usuarioService.update(cliente.usuario.idUsuario, { estadoUsuario: false})
      ]);

      if(clienteResult.affected === 0 || usuarioResult.affected === 0){
        throw new Error('Una de las actualizaciones no se registro');
      }

      return{
        success: true,
        message: `Cliente ID ${idCliente} (Usuario ID: ${cliente.usuario.idUsuario}) desactivados correctamente)`
      };

      /*await this.clienteRepository.update(id, { estadoCliente: false });

      if(cliente.usuario){
        await this.usuarioService.update()
      }

      return {
        success: true,
        message: `Cliente con ID ${id} desactivado correctamente`
      };*/

    } catch (error) {
      console.error(`Error al desactivar cliente ${idCliente}:`, error);
      throw new InternalServerErrorException({
        success: false,
        message: 'Error al desactivar el cliente y su usuario',
        error: error.message
      });
    }
  }

  findClientesFrecuentes(
    rangoFechasDto: RangoFechasDto,
  ): Promise<any[]> {
    return this.clienteRepository
      .createQueryBuilder('cliente')
      .innerJoin('cliente.facturas', 'factura')
      .innerJoin('factura.detallesFacturas', 'detalle')
      .innerJoin('detalle.inventario', 'inventario')
      .innerJoin('inventario.producto', 'producto')
      .select([
        'cliente.idCliente AS idCliente',
        'cliente.nombre AS nombreCliente',
        'COUNT(DISTINCT factura.idFactura) AS totalFacturas',
        'SUM(detalle.cantidad) AS totalProductosComprados',
        'SUM(detalle.subTotal) AS totalGastado',
      ])
      .where('detalle.fecha BETWEEN :desde AND :hasta', {
        desde: rangoFechasDto.fechaInicio,
        hasta: rangoFechasDto.fechaFin,
      })
      .groupBy('cliente.idCliente')
      .addGroupBy('cliente.nombre')
      .orderBy('totalFacturas', 'DESC')
      .limit(5)
      .getRawMany();
  }

  async verificarPassword(idCliente: number, currentPassword: string): Promise<{ isValid: boolean; message?: string }> {
    try {
      const cliente = await this.clienteRepository.findOne({
        where: { idCliente },
        relations: ['usuario'],
        select: {
          idCliente: true,
          usuario: {
            idUsuario: true,
            password: true
          }
        }
      });

      if (!cliente || !cliente.usuario) {
        return {
          isValid: false,
          message: 'Cliente no encontrado'
        };
      }

      const isValid = await bcrypt.compare(currentPassword, cliente.usuario.password);

      return {
        isValid,
        message: isValid ? 'Contraseña válida' : 'Contraseña incorrecta'
      };

    } catch (error) {
      console.error('Error en verificarPassword:', error);
      return {
        isValid: false,
        message: 'Error al verificar la contraseña'
      };
    }
  }

}
