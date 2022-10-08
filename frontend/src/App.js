import Header from "./componets/Header";
import Footer from "./componets/Footer"
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserSession } from "./store/user"


function App() {
  const dispatch = useDispatch();
  useEffect(() =>{
    dispatch(getUserSession());
  }, [dispatch]);
  return (
    <>
      <Header />
      <Footer />
    </>
  );
}

export default App;
