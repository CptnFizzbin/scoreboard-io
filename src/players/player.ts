export default interface Player {
  id:number;
  name:string;
  isNull?:boolean;
}

export const NullPlayer:Player = {
  id: -1,
  name: '',
  isNull: true,
};
