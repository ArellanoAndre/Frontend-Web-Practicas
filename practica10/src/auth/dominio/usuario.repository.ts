
import { NuevoUsuario, Usuario } from './usuario';

export const USUARIO_REPOSITORY = 'USUARIO_REPOSITORY';

export interface UsuarioRepository {
  buscarPorId(id: number): Promise<Usuario | null>;

  buscarPorEmail(email: string): Promise<Usuario | null>;

  crear(datos: NuevoUsuario): Promise<Usuario>;
}

