import { useState } from "react"
import styles from "./modalResources.module.css"

export default function ModalResources({closeModal, onSubmit}: any) {
  const[formState, setFormState] = useState({
    date: "",
    hours: "1"
  });

  const handleChange = (e: any) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(formState)

    closeModal();
  }

  return <div className={styles.modalcontainer}>
    <div className={styles.modal}>
      <form className={styles.formgroup}>
        <label htmlFor="hours-select">Seleccione la cantidad de horas:</label>
        <select name="hours" id="hours-select" value={formState.hours} onChange={handleChange}>
          {
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <option key={i} value={i}>{i}</option>
            ))
          }
        </select>
        <label htmlFor="date-select">Seleccione una fecha:</label>
        <input type="date" id="date-select" name="date" value={formState.date} onChange={handleChange}></input>
      </form>
      <div className={styles.modalbuttons}>
        <button type="submit" className={styles.btnaceptar} onClick={handleSubmit}>Aceptar</button>
        <button className={styles.btncancelar} onClick={closeModal}>Cancelar</button>
      </div>
    </div>
  </div>
}
