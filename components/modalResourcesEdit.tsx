import { useState } from "react"
import styles from "./modalResources.module.css"

export default function ModalResources({proyectos, closeModal, onSubmit, defaultValue}: any) {
  
  const[formState, setFormState] = useState(defaultValue);

  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.fecha) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const[key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      } 
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const handleChange = (e: any) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!validateForm()) return;

    console.log(formState);
    onSubmit(formState);
    closeModal();
  }

  return <div className={styles.modalcontainer}>
    <div className={styles.modal}>
      <form className={styles.formgroup}>
        <h2 className="text-2xl font-bold decoration-gray-200">Editar registro</h2>
        <label htmlFor="hours-select">Horas:</label>
        <select name="horas" id="hours-select" value={formState.horas} onChange={handleChange}>
          {
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <option key={i} value={i}>{i}</option>
            ))
          }
        </select>
        <label htmlFor="date-select">Fecha:</label>
        <input type="date" id="date-select" name="fecha" value={formState.fecha} onChange={handleChange}></input>
        {errors && <div className={styles.error}>{`Debe ingresar: ${errors}.`}</div>}
      </form>
      <div className={styles.modalbuttons}>
        <button type="submit" className={styles.btn_aceptar} onClick={handleSubmit}>Aceptar</button>
        <button className={styles.btn_cancelar} onClick={closeModal}>Cancelar</button>
      </div>
    </div>
  </div>
}
