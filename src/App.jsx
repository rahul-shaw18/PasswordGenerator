import Generator from "./components/generator";

function App() {
  return (
    <>
      <div className=" flex justify-center items-center h-screen">
        <div className="w-6/12 flex flex-col gap-16">
          <h1 className="font-semibold text-center text-[80px]">
            Password Generator
          </h1>
          <Generator />
        </div>
      </div>
    </>
  );
}

export default App;
