import { useState } from "react"
import styles from "./modalResources.module.css"

export default function ModalResources({proyectos, closeModal, onSubmit, defaultValue}: any) {
  
  const [selectDisabled, setSelectDisabled] = useState(false);

  const [projectIdx, setProjectIdx] = useState(0);

  const handlerLoadProjectIdx = (event: any) => {
    setProjectIdx(event.target.value);
  };

  const handleProyectoChange = (e: any) => {
    setFormState({
      ...formState,
      proyectoId: proyectos[e.target.value].id,
    });
  };
  
  const[formState, setFormState] = useState(defaultValue || {
    tareaId: "0",
    nombreTarea: "",
    fecha: "",
    horas: "1",
    proyectoId: proyectos[projectIdx].id
  });

  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.fecha && formState.nombreTarea) {
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

  const [tareaIdx, setTareaIdx] = useState(-1);

  const handlerLoadTareaIdx = (event: any) => {
    setTareaIdx(event.target.value);
  };

  const handleTareaChange = (e: any) => {
    setFormState({
      ...formState,
      tareaId: proyectos[projectIdx].tareas[e.target.value].id,
      nombreTarea: proyectos[projectIdx].tareas[e.target.value].name,
    });
    setSelectDisabled(true);
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
        
        <label htmlFor="selProject">Proyecto: </label>
        <select name="nombreProyecto" id="selProject" onChange={handleProyectoChange}
          onClick={handlerLoadProjectIdx} disabled={selectDisabled}>
          {
            proyectos.map((item: any, i: any) => (
              <option key={"project"+i} value={i}>{item.name}</option>
            ))
          }
        </select>

      <label htmlFor="tasks-select">Tarea:</label>
        <select name="nombreTarea" id="tasks-select" onChange={handleTareaChange}
          onClick={handlerLoadTareaIdx}>
          <option value={tareaIdx}>--Seleccione una tarea--</option>
          {
            // proyecto.tareas.map((t: {name: string}) => t.name).map((i: string) => (
            //   <option key={i} value={i}>{i}</option>
            // ))
            proyectos[projectIdx].tareas.map((item: any, i: any) => (
              <option key={"tarea"+i} value={i}>{item.name}</option>
            ))
          }
        </select>
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
      <div>Proyecto: {projectIdx}</div>
      <div>Tarea: {tareaIdx}</div>
    </div>
  </div>
}
