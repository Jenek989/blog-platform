import { Pagination } from 'antd';
import { useSelector } from 'react-redux';

import ArticlePreview from '../../ArticlePreview/ArticlePreview';

import classes from './ArticleList.module.scss';

const ArticleList = () => {
  const { articleList } = useSelector((state) => state.articles);
  console.log(articleList);
  return (
    <div className={classes.articleWrapper}>
      <ArticlePreview />
      <ArticlePreview />
      <ArticlePreview />
      <div className="articlePaginationWrapper">
        <Pagination
          className="articlePagination"
          current={1}
          total={10}
          pageSize={5}
          showSizeChanger={false}
          onChange={() => console.log('change pagination')}
        />
      </div>
    </div>
  );
};

export default ArticleList;
