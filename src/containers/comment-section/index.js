import useTranslate from '../../hooks/use-translate';
import commentsActions from '../../store-redux/comments/actions';
import { useParams } from 'react-router-dom';
import shallowequal from 'shallowequal';
import { memo, useCallback, useMemo } from 'react';
import Comments from '../../containers/comments';
import CommentsLayout from '../../components/comments-layout';
import useInit from '../../hooks/use-init';
import { useDispatch, useSelector as useSelectorRedux } from 'react-redux';
import useSelector from '../../hooks/use-selector';
import Spinner from '../../components/spinner';
import useStore from '../../hooks/use-store';

function CommentSection() {
  const { t, lang } = useTranslate();

  const store = useStore();

  const { userName } = useSelector(state => ({
    userName: state.session.user?.profile?.name,
  }));

  const dispatch = useDispatch();
  // Параметры из пути /articles/:id

  const params = useParams();

  useInit(() => {
    dispatch(commentsActions.load(params.id));
  }, [params.id, lang]);

  const select = useSelectorRedux(
    state => ({
      commentsWaiting: state.comments.waiting,
      comments: state.comments.data,
      count: state.comments.count,
    }),
    shallowequal,
  );

  const auth = useSelector(state => state.session.exists);

  const callbacks = {
    //Add new comment
    onAddComment: useCallback(
      (text, parentId) => {
        const comment = {
          text,
          parent: { _id: parentId || params.id, _type: parentId ? 'comment' : 'article' },
        };
        dispatch(commentsActions.add(comment, userName));
        // dispatch(commentsActions.load(params.id));
      },
      [dispatch, params.id, userName],
    ),
  };

  return (
    <Spinner active={select.commentsWaiting}>
      <CommentsLayout count={select.count} t={t}>
        <Comments
          userName={userName}
          data={select.comments}
          onAddComment={callbacks.onAddComment}
          auth={auth}
          parentId={params.id}
          t={t}
        />
      </CommentsLayout>
    </Spinner>
  );
}

export default memo(CommentSection);
