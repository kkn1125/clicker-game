export default (text: MonsterType) => {
  switch (text) {
    case "slime":
      return "슬라임";
    case "devilGoo":
      return "데빌구";
    case "poisonMushroom":
      return "독버섯";
    case "golem":
      return "골렘";
    default:
      return text;
  }
};
