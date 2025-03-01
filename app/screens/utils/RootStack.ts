export type RootStackParamList = {
  Waiting: undefined;
  ThanhLiXi: undefined;
  CauDo: undefined;
  TimDuocDoiThu: { opponentName: string };
  Winner: { correctAnswers: number };
  BanVit: {gameMode : 'ThuTaiBanVit | AnhKim  | AnhHung'} ; 
  ThuTaiBanVit: { opponentName: string; gameMode: string };
  AnhKim: { opponentName: string; gameMode: string };
  
};
