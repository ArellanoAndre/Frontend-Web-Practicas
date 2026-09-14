//  TODO: declarar la interfaz generica con estos cuatro metodos.
//     findById(id)      -> Promise<T | null>
//     findAll()         -> Promise<T[]>
//     save(entidad)     -> Promise<T>
//     delete(id)        -> Promise<void>

export interface Repository<T, K = string> {
  findById(id: K): Promise<T | null>;
  findAll(): Promise<T[]>;
  save(entity: T): Promise<T>;
  delete(id: K): Promise<void>;
}
