export const JobsList = ({
  list,
  deleteJ,
  organization,
  places,
  countries,
  objJob,
}) =>
  list.length > 0 ? (
    <div className="container-fluid">
      <table className="table table-dark">
        <thead>
          <tr>
            <th>Puesto</th>
            <th>Descripcion</th>
            <th>Empresa</th>
            <th>Ciudad</th>
            <th>Pais</th>
            <th>Actualizar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {list.map(job => {
            const { position, description, organizationId, id } = job;
            const org = organization.filter(
              e => Number(e.id) === Number(organizationId),
            );
            const place = places.filter(
              e => Number(e.id) === Number(org[0].placeId),
            );
            const countrie = countries.filter(
              e => Number(e.id) === Number(place[0].countrieId),
            );
            return (
              <tr key={id}>
                <td>{position}</td>
                <td>{description}</td>
                <td>{org[0].name}</td>
                <td>{place[0].name}</td>
                <td>{countrie[0].name}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-success btn-lg mt-4"
                    onClick={() => objJob(id)}>
                    <i className="fa fa-edit"></i>
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-lg mt-4"
                    onClick={() => deleteJ(id)}>
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
    <>
      <div className="sinResultados table-container">
        <p className="encabezado">No se encontraron resultados. Intente de nuevo</p>
      </div>
    </>
  );
