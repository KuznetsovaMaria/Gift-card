import Canvas from './Canvas';

export default function Card() {
  return (
    <>
      {/* <div className="card"> */}
      <div className="card-content">
        <div className="card-text">
          <h1>Дашусь💛</h1>
          <p>
            (Поскреби розовый прямоугольник, чтобы увидеть
            сюрприз)
          </p>
          <p>
            Эта открыточка тебе. Ты моя лучшая подруга, и я
            очень тебя люблю и ценю. И я желаю тебе сегодня
            удачного дня, а вообще, по жизни, всего самого
            для тебя лучшего🤞
          </p>
          <p>С любовью, Маша</p>
        </div>
        <Canvas></Canvas>
      </div>
      {/* </div> */}
    </>
  );
}

// function DrawRectangle() {
// }
