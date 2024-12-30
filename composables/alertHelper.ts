import Swal from "sweetalert2";

export const errorHelper = (exception: {
  response: { data: { message: string | undefined } };
}) => {
  if (exception.response.data) {
    Swal.fire("Error", exception.response.data.message, "error");
  } else {
    Swal.fire("Error", "Error Fetch Data", "error");
  }
};
