import React from 'react';


const CiudadesList = ({ list, deleteP, countries, objPlace }) => {
  return list.length > 0 ? (
    <div className="container-fluid">
      <table className="table table-dark">
        <thead>
          <tr>
            <th>Ciudad</th>
            <th>Pais</th>
            <th>Actualizar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {list.map(c => {
            const { name, countrieId, id } = c;
            let countrieName = countries.find(p => p.id === countrieId) || [];
            return (
              <tr key={id}>
                <td>{name}</td>
                <td>{countrieName.name}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-success btn-lg mt-4"
                    onClick={() => objPlace(id)}>
                    <i className="fa fa-edit"></i>
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-lg mt-4"
                    onClick={() => deleteP(id)}>
                    <i className="fa fa-trash"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  ) : (
    <div className="sinResultados table-container">
      <p className="encabezado">No se encontraron resultados.</p>
    </div>
  );
};

export default CiudadesList;
