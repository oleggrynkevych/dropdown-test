import './App.css';
import Dropdown from './components/Dropdown/Dropdown';
import { initialCities, initialCountries } from './data/data';

function App() {

  return (
    <div className="App">
      <Dropdown
        options={initialCities}
        firstSelectedText='Оберіть місто'
      />
      <Dropdown
        options={initialCountries}
        firstSelectedText='Оберіть країну'
      />
    </div>
  );
}

export default App;
