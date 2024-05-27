import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Paragraph from 'antd/es/typography/Paragraph';

import { fetchSinglePage } from '../../../store/articlesSlice';
// import ArticlePreview from '../../ArticlePreview/ArticlePreview';

import classes from './SinglePage.module.scss';

const SinglePage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { articleSinglePage } = useSelector((state) => state.articles);

  useEffect(() => {
    dispatch(fetchSinglePage(slug));
  }, []);

  console.log(articleSinglePage);

  return (
    <div className={classes.singlePageWrapper}>
      <Paragraph>
        <ReactMarkdown>{articleSinglePage.body}</ReactMarkdown>
      </Paragraph>
    </div>
  );
};

export default SinglePage;
