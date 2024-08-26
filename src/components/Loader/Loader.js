import React from 'react';
import { useSoftUIController } from 'context';  // Asegúrate de que la ruta es correcta
import logo from 'assets/images/curved-images/logo.png';  // Ruta a tu logo

const Loader = () => {
  // Usar el hook useSoftUIController para acceder al estado de carga
  const [controller] = useSoftUIController();
  const { loading } = controller;  // Extraer el estado de carga del controller

  return (
    loading && (
      <div className="loader">
        <img src={logo} alt="Loading..." />
      </div>
    )
  );
};

export default Loader;
