import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  createUserRequest, loginUserRequest, verifyTokenRequest,
  getTasksByIdRequest, getTasksAllRequest,
  getTasksRequest,
  deleteTaskRequest,
  createTaskRequest,
  getTaskRequest,
  updateTaskRequest,
  updateTaskRequestPoints,
  toggleTaskDoneRequest,
  getUnitsRequest,
  createUnitRequest,
  deleteUnitRequest,
  getUnitRequest,
  updateUnitRequest,
  toggleUnitDoneRequest,
  getRewardRequest,
  toggleRewardDoneRequest,
  toggleRewardDoneRequestVideo,
  toggleRewardDoneRequestLibros,
  toggleRewardDoneRequestSalud,
  toggleRewardDoneRequestArte,
  toggleRewardDoneRequestAlimentacion,
  getPointsRequest,
  deletePointRequest,
  getPointRequest,
  updatePointRequest,
  getLevelsRequest,
  deleteLevelRequest,
  getLevelRequest,
  updateLevelRequest,
  getEvidenciasRequest,
  mostrarEvidenciaRequest,
} from '../api/api'

export const Context = createContext()

export const useTasks = () => {
  const context = useContext(Context)
  if (!context) {
    throw new Error("useTasks debe usarse con un TaskContextProvider")
  }
  return context
}




export const ContextProvider = ({ children }) => {

  const [tasks, setTasks] = useState([])
  const [taskAll, setTaskAll] = useState([])
  const [units, setUnits] = useState([])
  const [rewards, setRewards] = useState([])
  const [points, setPoints] = useState([])
  const [levels, setLevels] = useState([])
  const [evidencias, setEvidencias] = useState([])

  //usuario
  const [users, setUsers] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  //funcion para crear un usuario
  const createUser = async (user) => {
    try {
      const response = await createUserRequest(user)
      setUsers(response.data)
      setIsAuthenticated(true)
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  //funcion para crear un usuario
  const loginUser = async (user) => {
    try {
      const response = await loginUserRequest(user)
      setUsers(response.data)
      setIsAuthenticated(true)
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  const logout =()=>{
    Cookies.remove("token")
    setIsAuthenticated(false)
    setUsers(null)
  }

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const res = await verifyTokenRequest(cookies.token);
        console.log(res);
        if (!res.data) return setIsAuthenticated(false);

        setIsAuthenticated(true);
        setUsers(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  //funcion para mostrar las actvidades de un usuario especifico
  async function getTasksById(id) {
    const response = await getTasksByIdRequest(id)
    setTasks(response.data)
    console.log(response.data);
    return response.data
  }
    
  //funcion para cargar todas las actvidades 
 {/* async function loadTasksAll() {
    const response = await getTasksAllRequest()
    setTaskAll(response.data);
    
  } */}

  //funcion para cargar las actvidades de un usuario activo
  async function loadTasks() {
    const response = await getTasksRequest()
    
    setTasks(response.data);
    
  }

  //funcion para eliminar las actividades
  const deleteTask = async (id) => {
    try {
      const response = await deleteTaskRequest(id)
      setTasks(tasks.filter(task => task.id !== id))
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  //funcion para crear una actividades
  const createTask = async (task) => {
    try {
      const response = await createTaskRequest(task)
      setTasks([...tasks, response.data])
    } catch (error) {
      console.error(error);
    }
  }

  //funcion para obtener una actividad
  const getTask = async (id) => {
    try {
      const response = await getTaskRequest(id)
      return response.data

    } catch (error) {
      console.error(error);
    }
  }

  //funcion para actualizar una actividad
  const updateTask = async (id, newFields) => {
    try {
      const response = await updateTaskRequest(id, newFields)
    } catch (error) {
      console.error(error);
    }
  }

  //funcion para actualizar una actividad
  const updateTaskPoints = async (id, newFields) => {
    try {
      const response = await updateTaskRequestPoints(id, newFields)
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  //funcion para cambiar de estado una actividad
  const toggleTaskDone = async (id) => {
    try {
      const taskFound = tasks.find((task) => task.id === id);
      await toggleTaskDoneRequest(id, taskFound.estado === 0 || taskFound.estado === null ? 1 : 0);
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, estado: taskFound.estado === 0 || taskFound.estado === null ? 1 : 0 } : task
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  ////

  //funcion para cargar las unidades
  async function loadUnits() {
    const response = await getUnitsRequest()
    setUnits(response.data);
  }

  //funcion para crear una unidad
  const createUnit = async (unit) => {
    try {
      const response = await createUnitRequest(unit)
      setUnits([...units, response.data])
    } catch (error) {
      console.error(error);
    }
  }


  //funcion para eliminar las unidades
  const deleteUnit = async (id) => {
    try {
      const response = await deleteUnitRequest(id)
      setUnits(units.filter(unit => unit.id !== id))
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  //funcion para obtener una unidad
  const getUnit = async (id) => {
    try {
      const response = await getUnitRequest(id)
      return response.data

    } catch (error) {
      console.error(error);
    }
  }

  //funcion para actualizar una unidad
  const updateUnit = async (id, newFields) => {
    try {
      const response = await updateUnitRequest(id, newFields)
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  //funcion para cambiar de estado una actividad
  const toggleUnitDone = async (id) => {
    try {
      const unitFound = units.find((unit) => unit.id === id);
      await toggleUnitDoneRequest(id, unitFound.estado === 0 ? 1 : 0);
      setUnits(
        units.map((unit) =>
          unit.id === id ? { ...unit, estado: unitFound.estado === 0 ? 1 : 0 } : unit
        )
      );
    } catch (error) {
      console.error(error);
    }
  };


  ///

  //funcion para cargar la personalizacion de recompensas
  async function loadReward() {
    const response = await getRewardRequest()
    setRewards(response.data);
  }

  //funcion para cambiar el estado/preferencia de tecnologia
  const toggleRewardDoneTecnologia = async (id) => {
    try {
      const RewardFound = rewards.find((reward) => reward.id === id);
      await toggleRewardDoneRequest(id, RewardFound.flagTecnologia === 0 ? 1 : 0);
      setRewards(
        rewards.map((reward) =>
          reward.id === id ? { ...reward, flagTecnologia: RewardFound.flagTecnologia === 0 ? 1 : 0 } : reward
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  //funcion para cambiar el estado/preferencia de tecnologia
  const toggleRewardDonevideojuegos = async (id) => {
    try {
      const RewardFound = rewards.find((reward) => reward.id === id);
      await toggleRewardDoneRequestVideo(id, RewardFound.flagVideojuegos === 0 ? 1 : 0);
      setRewards(
        rewards.map((reward) =>
          reward.id === id ? { ...reward, flagVideojuegos: RewardFound.flagVideojuegos === 0 ? 1 : 0 } : reward
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  //funcion para cambiar el estado/preferencia de Libros
  const toggleRewardDoneLibros = async (id) => {
    try {
      const RewardFound = rewards.find((reward) => reward.id === id);
      await toggleRewardDoneRequestLibros(id, RewardFound.flagLibros === 0 ? 1 : 0);
      setRewards(
        rewards.map((reward) =>
          reward.id === id ? { ...reward, flagLibros: RewardFound.flagLibros === 0 ? 1 : 0 } : reward
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  //funcion para cambiar el estado/preferencia de gymSalud
  const toggleRewardDoneSalud = async (id) => {
    try {
      const RewardFound = rewards.find((reward) => reward.id === id);
      await toggleRewardDoneRequestSalud(id, RewardFound.flagGimnasio === 0 ? 1 : 0);
      setRewards(
        rewards.map((reward) =>
          reward.id === id ? { ...reward, flagGimnasio: RewardFound.flagGimnasio === 0 ? 1 : 0 } : reward
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  //funcion para cambiar el estado/preferencia de Arte
  const toggleRewardDoneArte = async (id) => {
    try {
      const RewardFound = rewards.find((reward) => reward.id === id);
      await toggleRewardDoneRequestArte(id, RewardFound.flagArte === 0 ? 1 : 0);
      setRewards(
        rewards.map((reward) =>
          reward.id === id ? { ...reward, flagArte: RewardFound.flagArte === 0 ? 1 : 0 } : reward
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  //funcion para cambiar el estado/preferencia de Alimentacion
  const toggleRewardDoneAlimentacion = async (id) => {
    try {
      const RewardFound = rewards.find((reward) => reward.id === id);
      await toggleRewardDoneRequestAlimentacion(id, RewardFound.flagAlimentacion === 0 ? 1 : 0);
      setRewards(
        rewards.map((reward) =>
          reward.id === id ? { ...reward, flagAlimentacion: RewardFound.flagAlimentacion === 0 ? 1 : 0 } : reward
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  ///

  //funcion para cargar las actvidades
  async function loadPoints() {
    const response = await getPointsRequest()
    setPoints(response.data);
  }

  //funcion para eliminar la puntuacion
  const deletePoint = async (id) => {
    try {
      const response = await deletePointRequest(id)
      setPoints(points.filter(point => point.id !== id))
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  //funcion para obtener una puntuacion
  const getPoint = async (id) => {
    try {
      const response = await getPointRequest(id)
      return response.data

    } catch (error) {
      console.error(error);
    }
  }

  //funcion para actualizar una puntuacion
  const updatePoint = async (id) => {
    try {
      const response = await updatePointRequest(id)
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }


  ///


  //funcion para cargar los niveles 
  async function loadLevels() {
    const response = await getLevelsRequest()
    setLevels(response.data);
  }

  //funcion para eliminar los niveles
  const deleteLevel = async (id) => {
    try {
      const response = await deleteLevelRequest(id)
      setLevels(levels.filter(level => level.id !== id))
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  //funcion para obtener un anivel
  const getLevel = async (id) => {
    try {
      const response = await getLevelRequest(id)
      return response.data

    } catch (error) {
      console.error(error);
    }
  }

  //funcion para actualizar un nivel
  const updateLevel = async (id) => {
    try {
      const response = await updateLevelRequest(id)
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }


  ///

  //funcion para cargar las evidencias
  async function loadEvidencias() {
    const response = await getEvidenciasRequest()
    setEvidencias(response.data);
  }



  //
  const mostrarEvidencia = async (id) => {
    try {
      const response = await mostrarEvidenciaRequest(id)
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }


  return <Context.Provider value={{ createUser, loginUser, users, isAuthenticated,logout, loading, tasks, getTasksById, taskAll, loadTasks, deleteTask, createTask, getTask, updateTask, updateTaskPoints, toggleTaskDone, units, loadUnits, createUnit, deleteUnit, getUnit, updateUnit, toggleUnitDone, rewards, loadReward, toggleRewardDoneTecnologia, toggleRewardDonevideojuegos, toggleRewardDoneLibros, toggleRewardDoneSalud, toggleRewardDoneArte, toggleRewardDoneAlimentacion, points, loadPoints, deletePoint, getPoint, updatePoint, levels, loadLevels, deleteLevel, getLevel, updateLevel, loadEvidencias, mostrarEvidencia, evidencias }} >
    {children}
  </Context.Provider>
}