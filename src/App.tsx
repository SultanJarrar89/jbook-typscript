import CodeCell from './components/CodeCell';
import TextEditor from './components/TextEditor';
import { Provider } from 'react-redux';
import { store } from './redux';
import CellList from './components/CellList';
const App = () => {
  return (
    <Provider store={store}>
      <div>
        {/* <CodeCell /> */}
        {/* <TextEditor /> */}
        <CellList />
      </div>
    </Provider>
  );
};

export default App;
