import { useState, useEffect } from "react"
import styles from "./modalResources.module.css"

export default function ModalResources({proyectos, closeModal, onSubmit, defaultValue, recursoId}: any) {
  
  const [selectDisabled, setSelectDisabled] = useState(false);

  const [projectIdx, setProjectIdx] = useState(0);

  const handlerLoadProjectIdx = (event: any) => {
    setProjectIdx(event.target.value);
  };

  const handleProyectoChange = (e: any) => {
    setFormState({
      ...formState,
      proyecto: proyectos[e.target.value].id,
    });
  };
  
  const[formState, setFormState] = useState(defaultValue || {
    tarea: "0",
    nombreTarea: "",
    fecha: "",
    horas: "1",
    proyecto: proyectos[projectIdx].id,
    recurso: recursoId
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
      tarea: proyectos[projectIdx].tareas[e.target.value].id,
      nombreTarea: proyectos[projectIdx].tareas[e.target.value].nombre,
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
    //e.preventDefault();

    if (!validateForm()) return;

    //console.log(formState);
    onSubmit(formState);
    closeModal();
  }

  return <div className={styles.modalcontainer}>
    <div className={styles.modal}>
      <form className={styles.formgroup}>
        <h2 className="text-2xl font-bold decoration-gray-200">Agregar registro</h2>
        <label htmlFor="selProject">Proyecto: </label>
        <select name="nombreProyecto" id="selProject" onChange={handleProyectoChange}
          onClick={handlerLoadProjectIdx} disabled={selectDisabled}>
          {
            proyectos.map((item: any, i: any) => (
              <option key={"project"+i} value={i}>{item.nombre}</option>
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
              <option key={"tarea"+i} value={i}>{item.nombre}</option>
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
        <button type="submit" className="mt-4 mx-2 px-4 py-2 bg-green-500 text-white rounded" onClick={handleSubmit}>Confirmar</button>
        <button className="mt-4 mx-2 px-4 py-2 bg-red-500 text-white rounded" onClick={closeModal}>Cancelar</button>
      </div>
      {/* <div>Proyecto: {projectIdx}</div>
      <div>Tarea: {tareaIdx}</div> */}
    </div>
  </div>
}
