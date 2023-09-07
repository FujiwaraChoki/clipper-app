import { SafeAreaView, useColorScheme } from 'react-native';
import { NativeRouter, Route, Routes } from 'react-router-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import RouteHistoryProvider from "./contexts/RouteHistoryContext";
import UserContextProvider from './contexts/UserContext';

import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Settings from './components/Settings';
import Login from './components/Login';
import SignUp from './components/SignUp';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    display: "flex",
    minHeight: "100%"
  };

  return (
    <NativeRouter>
      <UserContextProvider>
        <RouteHistoryProvider>
          <SafeAreaView style={backgroundStyle}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </SafeAreaView>
        </RouteHistoryProvider>
      </UserContextProvider>
    </NativeRouter>
  );
};

export default App;
