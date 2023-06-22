import { useState } from "react"
import styles from "./modalResources.module.css"

export default function ModalResources({closeModal, onSubmit, defaultValue}: any) {
  const[formState, setFormState] = useState({
    date: defaultValue.fecha,
    hours: defaultValue.horas
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
        <button type="submit" className={styles.btn_aceptar} onClick={handleSubmit}>Aceptar</button>
        <button className={styles.btn_cancelar} onClick={closeModal}>Cancelar</button>
      </div>
    </div>
  </div>
}
