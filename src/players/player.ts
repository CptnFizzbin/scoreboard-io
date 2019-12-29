export default interface Player {
  id:number;
  name:string;
  score:number;
  bid:number;
  isNull?:boolean;
}

export const NullPlayer:Player = {
  id: -1,
  name: '',
  score: 0,
  bid: 0,
  isNull: true,
};
