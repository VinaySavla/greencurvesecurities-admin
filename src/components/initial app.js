import './App.css';
import DataTable from './components/DataTable';
import Logo from './assets/Logo.png';
import Login from './components/Login/Login';

function App() {
  return (
    <div>
      <header>
        <img src={Logo} alt="Logo"/>
        <br></br>
        <br></br>
      </header>
      <Login />
      <DataTable />
    </div>
  );
}

export default App;
