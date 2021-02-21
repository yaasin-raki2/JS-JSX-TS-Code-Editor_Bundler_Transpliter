import { ActionType } from "../action-types";
import { Middleware } from "./middleware";
import bundle from "../../bundler";
import { resourceUsage } from "node:process";

let timer: any;

export const bundlerMiddleware: Middleware = ({ getState, dispatch }) => (next) => (
  action
) => {
  next(action);

  if (action.type !== ActionType.UPDATE_CELL) return;

  const {
    cells: { data: cellData },
  } = getState();

  const cell = cellData[action.payload.id];

  if (cell.type === "text") return;

  clearTimeout(timer);

  timer = setTimeout(async () => {
    console.log("Starting Bundling");
    const result = await bundle(action.payload.content);
    dispatch({
      type: ActionType.BUNDLE_CREATED,
      payload: {
        cellId: action.payload.id,
        bundle: result,
      },
    });
    console.log("Dispatched Bundle Created");
  }, 750);
};
