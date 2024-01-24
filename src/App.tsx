import { Toaster } from 'react-hot-toast';
import Form from './components/common/Form';
import WeatherList from './components/common/WeatherList';

const App = () => {
  return (
    <main>
      <Form />
      <WeatherList />
      <Toaster position="bottom-left" reverseOrder={false} />
    </main>
  );
};

export default App;
