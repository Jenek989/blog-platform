import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import NewArticle from '../../NewArticle/NewArticle';
import { fetchCreateArticle } from '../../../store/articlesSlice';

const NewArticlePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = ({ title, description, text: body }, tagList) => {
    const params = { title, description, body, tagList };
    dispatch(fetchCreateArticle(params));
    navigate('/');
  };
  return <NewArticle title="Create new article" onSubmit={onSubmit} />;
};

export default NewArticlePage;
