import './App.css';
import DataTable from './components/DataTable';
import Logo from './assets/Logo.png';

function App() {
  return (
    <div>
      <header>
        <img src={Logo} alt="Logo"/>
        <br></br>
        <br></br>
      </header>
      <DataTable />
    </div>
  );
}

export default App;
