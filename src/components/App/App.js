import { Routes, Route } from 'react-router-dom';

import { Layout } from '../Layout/Layout';
import ArticleList from '../pages/ArticleList/ArticleList';
import SinglePage from '../pages/SinglePage/SinglePage';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';

import classes from './App.module.scss';

function App() {
  return (
    <div className={classes.appWrapper}>
      <Routes>
        <Route to="/" element={<Layout />}>
          <Route index element={<ArticleList />} />
          <Route path="/articles" element={<ArticleList />} />
          <Route path="/articles/:slug" element={<SinglePage />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
