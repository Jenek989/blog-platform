import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import NewArticle from '../../NewArticle/NewArticle';
import { fetchUpdateArticle } from '../../../store/articlesSlice';

import classes from './EditArticlePage.module.scss';

const EditArticlePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();
  const singleArticle = useSelector((state) => state.articles.articleSinglePage);

  const onSubmit = ({ title, description, text: body }, tagList) => {
    const params = { body: { title, description, body, tagList }, slug };
    dispatch(fetchUpdateArticle(params));
    navigate('/');
  };

  return (
    <div className={classes.EditArticlePageWrapper}>
      <NewArticle title="Edit article" singleArticle={singleArticle} onSubmit={onSubmit} />
    </div>
  );
};

export default EditArticlePage;
