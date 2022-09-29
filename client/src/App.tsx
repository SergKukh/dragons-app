import { useEffect } from 'react';
import './App.css';
import AppRouter from './components/AppRouter';
import Navbar from './components/Navbar';
import Loader from './components/UI/Loader';
import { useAction, useAppSelector } from './hooks/redux';

function App() {
  const { checkAuth } = useAction();
  const { isLoading } = useAppSelector(state => state.authReducer);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      checkAuth();
    }
  }, []);

  return (
    <div className="App">
      <Navbar />
      <div className='layout'>
        {isLoading ?
          <div className='center'><Loader /></div>
          :
          <AppRouter />}
      </div>
    </div>
  );
}

export default App;
