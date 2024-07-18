import MainRouter from "./routes/MainRouter";

const App = () => {

  

  return (
    <div className="h-screen w-full bg-[url('https://i.pinimg.com/originals/cc/61/ff/cc61ff66b3e07ab0b80908a9611b2b1d.jpg')] bg-cover bg-no-repeat bg-center ">
      <div className="h-full w-full flex">
        <MainRouter /> 
      </div>
    </div>
  );
};

export default App;
