interface SaludoProps {
  nombre: string;
}

function Saludo({ nombre }: SaludoProps) {
  return (
    <h2>¡Hola, {nombre}! Bienvenido a React.</h2>
  );
}

export default Saludo;
