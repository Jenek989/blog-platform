import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';

import { Layout } from '../Layout/Layout';
import ArticleList from '../pages/ArticleList/ArticleList';
import SinglePage from '../pages/SinglePage/SinglePage';
import NewArticlePage from '../pages/NewArticlePage/NewArticlePage';
import EditArticlePage from '../pages/EditArticlePage/EditArticlePage';
import Profile from '../Profile/Profile';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';

import classes from './App.module.scss';

function App() {
  const auth = useSelector((state) => state.users.email);

  return (
    <div className={classes.appWrapper}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ArticleList />} />
          <Route path="/articles" element={<Navigate to="/" replace />} />
          <Route path="/articles/:slug" element={<SinglePage />} />
          <Route path="/new-article" element={!auth ? <Navigate to="/sign-in" replace /> : <NewArticlePage />} />
          <Route
            path="/articles/:slug/edit"
            element={!auth ? <Navigate to="/sign-in" replace /> : <EditArticlePage />}
          />
          <Route path="/profile" element={!auth ? <Navigate to="/sign-in" replace /> : <Profile />} />
          <Route path="/sign-in" element={auth ? <Navigate to="/" replace /> : <SignIn />} />
          <Route path="/sign-up" element={auth ? <Navigate to="/" replace /> : <SignUp />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
