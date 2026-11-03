import { useEffect, useState } from 'react';
import { traerClase } from '../servicios/gimnasio.ts';
import { mensajeDeError } from '../servicios/api.ts';
import type { ClaseConHorarios } from '../tipos.ts';

export function useClase(id: string | undefined) {
  const [clase, setClase] = useState<ClaseConHorarios | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let vigente = true;

    setCargando(true);
    setError(null);
    setClase(null);

    const numero = Number(id);

    if (!id || !Number.isInteger(numero) || numero <= 0) {
      setError('El identificador de la clase no es válido.');
      setCargando(false);
      return;
    }

    traerClase(numero)
      .then((resultado) => {
        if (vigente) setClase(resultado);
      })
      .catch((e: unknown) => {
        if (vigente) {
          setError(mensajeDeError(e, 'No se pudo cargar la clase.'));
        }
      })
      .finally(() => {
        if (vigente) setCargando(false);
      });

    return () => {
      vigente = false;
    };
  }, [id]);

  return { clase, cargando, error };
}
