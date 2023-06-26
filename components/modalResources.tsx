import { useState } from "react"
import styles from "./modalResources.module.css"

export default function ModalResources({tareas, closeModal, onSubmit, defaultValue}: any) {
  const[formState, setFormState] = useState(defaultValue || {
    tareaId: tareas[0].tarea,
    fecha: "",
    horas: "1",
  });

  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.fecha) {
      setErrors("");
      return true;
    } else {
      setErrors("fecha");
      return false;
    }
  }

  const handleChange = (e: any) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit(formState);
    closeModal();
  }

  return <div className={styles.modalcontainer}>
    <div className={styles.modal}>
      <form className={styles.formgroup}>
      <label htmlFor="tasks-select">Seleccione una tarea:</label>
        <select name="tareaId" id="tasks-select" value={formState.tareaId} onChange={handleChange}>
          {
            tareas.map((t: {tarea: string}) => t.tarea).map((i: string) => (
              <option key={i} value={i}>{i}</option>
            ))
          }
        </select>
        <label htmlFor="hours-select">Seleccione la cantidad de horas:</label>
        <select name="horas" id="hours-select" value={formState.horas} onChange={handleChange}>
          {
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <option key={i} value={i}>{i}</option>
            ))
          }
        </select>
        <label htmlFor="date-select">Seleccione una fecha:</label>
        <input type="date" id="date-select" name="fecha" value={formState.fecha} onChange={handleChange}></input>
        {errors && <div className={styles.error}>{`Debe ingresar una ${errors}.`}</div>}
      </form>
      <div className={styles.modalbuttons}>
        <button type="submit" className={styles.btn_aceptar} onClick={handleSubmit}>Aceptar</button>
        <button className={styles.btn_cancelar} onClick={closeModal}>Cancelar</button>
      </div>
    </div>
  </div>
}
