export const PointsActionTypes = {
  SET: 'POINTS.SET',
};

export interface PointsAction {
  type:string;
  playerId:number;
  label:string;
  value?:number;
}

export function SetPoints(playerId:number, label:string, value:number):PointsAction {
  return {
    type: PointsActionTypes.SET,
    playerId,
    label,
    value,
  };
}
