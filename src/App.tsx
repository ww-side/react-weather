import { Toaster } from 'react-hot-toast';
import Form from './components/common/Form';
import WeatherList from './components/common/WeatherList';
import LanguageSwitch from './components/common/LanguageSwitch';

const App = () => {
  return (
    <main className="px-[23px] py-[21px]">
      <LanguageSwitch />
      <Form />
      <WeatherList />
      <Toaster position="bottom-left" reverseOrder={false} />
    </main>
  );
};

export default App;
