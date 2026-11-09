// estado/inscripciones.ts — un STORE de Zustand: estado que vive FUERA de React y que
// cualquier componente lee con un hook, sin Provider y sin pasarlo por props.
// Es la cuarta forma de guardar un dato: useState (un componente), props (padre → hijo),
// contexto (la sesión: muchos lo leen y cambia poco) y store (muchos lo leen y cambia seguido).
import { create } from 'zustand';
import { traerMisInscripciones } from '../servicios/gimnasio.ts';
import { mensajeDeError } from '../servicios/api.ts';
import type { Inscripcion } from '../tipos.ts';

// 1. LA FORMA DEL STORE: los datos y las funciones que los cambian, juntos.
//    Quien lo usa no sabe que cargar() habla con la API: sólo la llama.
interface EstadoInscripciones {
  lista: Inscripcion[];
  cargando: boolean;
  error: string | null;
  cargar: () => Promise<void>;
  vaciar: () => void;
}

// 2. create() regresa un HOOK: useInscripciones. Se le pasa una función que recibe set
//    (para cambiar el estado) y regresa el estado inicial con sus funciones.
//    El create<T>()(...) con doble paréntesis es para que TypeScript tome el tipo.
export const useInscripciones = create<EstadoInscripciones>()((set) => ({
  lista: [],
  cargando: true, // empieza en true: así Mis inscripciones no dice "no tienes clases" un instante
  error: null,

  cargar: async () => {
    // set NO muta: reemplaza las partes que le pases y deja el resto como estaba.
    // Es la regla de "crear uno nuevo" de la Sesión 14. Cada set repinta a quien lo lea.
    set({ cargando: true, error: null });
    try {
      set({ lista: await traerMisInscripciones() }); // GET /inscripciones/mias, con token
    } catch (e) {
      set({ error: mensajeDeError(e, 'No se pudieron cargar tus inscripciones.') });
    } finally {
      set({ cargando: false }); // salga bien o mal
    }
  },

  // Al salir: la lista vacía (y nada cargando, para que no se quede la rueda girando).
  vaciar: () => set({ lista: [], cargando: false, error: null }),
}));