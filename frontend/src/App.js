import Header from "./componets/Header";
import Main from "./componets/Main";
import Footer from "./componets/Footer"
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { restoreUser } from "./store/account"

function App() {
  const dispatch = useDispatch();
  useEffect(() =>{
    dispatch(restoreUser());
  }, [dispatch]);
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}

export default App;
