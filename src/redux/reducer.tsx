// import {
//     ADD_TASK,
//     EDIT_TASK,
//     DELETE_TASK,
//     ADD_TEXT,
//     ALL_TASKS,
//     IS_COMPLETED,
//   } from "../actions/actionsTypes";
  
//   import { Task, State } from "../../types";
  
//   const initialState: State = {
//     tasks: [],
//     value: "",
//   };
  
//   const taskManager = (
//     state: State = initialState,
  
//     action:
//       | { type: typeof ADD_TASK; payload: { id: string; title: string } }
//       | { type: typeof EDIT_TASK; payload: { id: string; title: string } }
//       | { type: typeof DELETE_TASK; payload: string }
//       | { type: typeof ADD_TEXT; payload: { text: string } }
//       | { type: typeof ALL_TASKS; payload: Task[] }
//       | { type: typeof IS_COMPLETED; payload: { id: string; title: string } }
//   ): State => {
//     console.log(action.payload);
//     switch (action.type) {
//       case ADD_TASK:
//         return {
//           ...state,
//           tasks: [...state.tasks, action.payload],
//         };
//       case EDIT_TASK:
//         return {
//           ...state,
//           tasks: state.tasks.map((task: Task) =>
//             task.id === action.payload.id
//               ? { ...task, title: action.payload.title }
//               : task
//           ),
//         };
//       case DELETE_TASK:
//         return {
//           ...state,
//           tasks: state.tasks.filter((task: Task) => task.id !== action.payload),
//         };
//       case ADD_TEXT:
//         return {
//           ...state,
//           value: action.payload.text,
//         };
//       case ALL_TASKS:
//         return {
//           ...state,
//           tasks: action.payload,
//         };
//       case IS_COMPLETED:
//         console.log("action.payload.id", action.payload.id);
//         return {
//           ...state,
  
//           tasks: state.tasks.map((task: Task) =>
//             task.id === action.payload.id
//               ? {
//                   ...task,
//                   isCompleted: !task.isCompleted,
//                   title: action.payload.title,
//                 }
//               : task
//           ),
//         };
//       default:
//         return state;
//     }
//   };
  
//   export default taskManager;
  