import { useEffect } from 'react';
import { Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import ArticlePreview from '../../ArticlePreview/ArticlePreview';
import { setCurrentPage, fetchArticleList } from '../../../store/articlesSlice';
import Spinner from '../../Spinner/Spinner';

import classes from './ArticleList.module.scss';

const ArticleList = () => {
  const { articleList, articlesCount, currentPage } = useSelector((state) => state.articles);
  const { email: auth } = useSelector((state) => state.users);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchArticleList({ limit: 5, offset: (currentPage - 1) * 5 }));
  }, [currentPage, auth]);

  if (!articleList.length)
    return (
      <li className={classes.articleSpin}>
        <Spinner />
      </li>
    );

  return (
    <ul className={classes.articleWrapper}>
      {articleList.map((article) => {
        return (
          <li key={article.slug} className={classes.article}>
            <ArticlePreview article={article} />
          </li>
        );
      })}
      <div className={classes.articlePaginationWrapper}>
        <Pagination
          className={classes.articlePagination}
          current={currentPage}
          total={articlesCount}
          pageSize={5}
          showSizeChanger={false}
          size="small"
          onChange={(page) => {
            dispatch(setCurrentPage(page));
          }}
        />
      </div>
    </ul>
  );
};

export default ArticleList;
