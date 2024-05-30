import { useEffect, useState } from 'react';
import { Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import ArticlePreview from '../../ArticlePreview/ArticlePreview';
import { fetchArticleList } from '../../../store/articlesSlice';
import Spinner from '../../Spinner/Spinner';

import classes from './ArticleList.module.scss';

const ArticleList = () => {
  const { articleList, articlesCount } = useSelector((state) => state.articles);
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchArticleList({ limit: 5, offset: (currentPage - 1) * 5 }));
  }, [currentPage]);

  if (!articleList.length)
    return (
      <li className={classes.articleSpin}>
        <Spinner />
      </li>
    );

  const articlesList = articleList.map((article) => {
    return (
      <li key={article.slug} className={classes.article}>
        <ArticlePreview article={article} />
      </li>
    );
  });

  console.log('articleList:', articleList);

  return (
    <ul className={classes.articleWrapper}>
      {articlesList}
      <div className={classes.articlePaginationWrapper}>
        <Pagination
          className={classes.articlePagination}
          current={currentPage}
          total={articlesCount}
          pageSize={5}
          showSizeChanger={false}
          onChange={(page) => {
            setCurrentPage(page);
          }}
        />
      </div>
    </ul>
  );
};

export default ArticleList;
