import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal);

export const alertaError = mensaje => {
  MySwal.fire({
    icon: 'error',
    title: 'Error',
    text: mensaje,
  });
};

export const alertaBorrar = () => {
  return MySwal.fire({
    title: '¿You sure want to delete?',
    text: 'Once deleted, the data cannot be recovered.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delet!',
  }).then(result => {
    if (result.isConfirmed) {
      MySwal.fire(
        'Deleted!',
        'The record was deleted successfully.',
        'success',
      );
      return true;
    } else {
      return false;
    }
  });
};
