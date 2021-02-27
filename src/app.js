import { FordMise } from "./fordMise";

export default () => {
  const ford = [1, 2, 3, 4, 5];

  let eiei = new FordMise((res) => {
    res();
  });
  ford.forEach((item) => {
    eiei = eiei.then(() => {
      return new FordMise((res) => {
        setTimeout(() => {
          console.log(item);
          res();
        }, Math.random() * 100);
      });
    });
  });


  console.log(new FordMise((res)=>{
    res('haha')
  }))
};
