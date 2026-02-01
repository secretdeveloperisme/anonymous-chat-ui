import "~/App.css"
function App() {
  const APP_NAME= import.meta.env.VITE_APP_NAME;
  return (
    <>
      <h1>{APP_NAME}</h1>
    </>
  )
}

export default App
