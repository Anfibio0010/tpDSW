import './login.card.css';
import { useState } from 'react';

function Logincard() {
  const [imag, setimag] = useState('fa-solid fa-eye-slash icono-ojo');

  const [type_text, settypetext] = useState('password');

  const handleClickCrossedEye = () => {
    if (imag == 'fa-solid fa-eye-slash icono-ojo') {
      setimag('fa-solid fa-eye icono-ojo');
      settypetext('text');
    } else {
      setimag('fa-solid fa-eye-slash icono-ojo');
      settypetext('password');
    }
  };

  return (
    <div>
      <div className="contenedor3">
        <div className="contenedor_login">
          <div className="contenedor_usuario">
            <p className="texto_bienvenida">¡Bienvenido!</p>
            <form>
              <div className="input_container">
                <input type="text" placeholder="Email" className="formulario" />
                <i className="fa-solid fa-envelope icono"></i>
              </div>
              <div className="input_container">
                <input
                  type={type_text}
                  placeholder="Contraseña"
                  className="formulario"
                />
                <i className={imag} onClick={handleClickCrossedEye}></i>
                <i className="fa-solid fa-lock icono"></i>
              </div>
            </form>
            <button className="boton">Iniciar sesión</button>
            <p className="texto">
              ¿No tienes cuenta? <span className="regis">Regístrate </span>
            </p>
            <p className="texto contraseña">Olvidé mi contraseña</p>
          </div>
          <div className="foto_login">
            <img src="/images/login.png" />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Logincard;
