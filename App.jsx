import Navigation from './src/navigation/Navigation';
import AuthContextProvider from './src/store';
import {StatusBar} from "react-native"
const App = () => {
  return (
    <>
  <StatusBar backgroundColor={'#1ca3ac'} barStyle={'light-content'} />
    <AuthContextProvider>
      <Navigation />
    </AuthContextProvider>
    </>
  );
};

export default App;
