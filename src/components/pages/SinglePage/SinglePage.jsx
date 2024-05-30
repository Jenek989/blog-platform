import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Paragraph from 'antd/es/typography/Paragraph';

import { fetchSinglePage } from '../../../store/articlesSlice';
import ArticlePreview from '../../ArticlePreview/ArticlePreview';
import Spinner from '../../Spinner/Spinner';

import classes from './SinglePage.module.scss';

const SinglePage = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const { articleSinglePage, loading } = useSelector((state) => state.articles);

  useEffect(() => {
    dispatch(fetchSinglePage(slug));
  }, [slug]);

  console.log(articleSinglePage);

  if (!articleSinglePage) return null;
  if (loading)
    return (
      <div className={classes.singlePageWrapperSpin}>
        <Spinner />
      </div>
    );

  return (
    <div className={classes.singlePageWrapper}>
      <ArticlePreview article={articleSinglePage} singlePage />
      <Paragraph className={classes.singlePageMarkdown}>
        <ReactMarkdown>{articleSinglePage.body}</ReactMarkdown>
      </Paragraph>
    </div>
  );
};

export default SinglePage;
