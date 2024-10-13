import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import CommentsItem from '../comments-item';
import UnauthComment from '../unauth-comment';
import CommentForm from '../comment-form';
import { findLastChildID } from '../../utils/findLastChildID';

function CommentsTree({
  comments,
  currentComment,
  onCommOpen,
  onSubmit,
  onCancel,
  auth,
  t,
  userName,
}) {
  const cn = bem('CommentTree');

  const lastChildId = findLastChildID(comments, currentComment);

  const maxLevelIndent = 15;

  return (
    <div className={cn()}>
      {!!comments.length && comments.map(comment => (
        <>
      <div
        key={comment._id}
        style={{ marginLeft: comment.level < maxLevelIndent + 1 ? (comment.level - 1) * 30 : maxLevelIndent * 30 }}
      >
        <CommentsItem comment={comment} onReply={id => onCommOpen(id)} t={t} userName={userName} />
      </div>
        {auth && lastChildId === comment._id && (
          <CommentForm
            onSubmit={text => onSubmit(text, currentComment)}
            onCancel={onCancel}
            isAnswer={true}
            t={t}
          />
        )}
        {!auth && currentComment === comment._id && (
          <UnauthComment showButton={true} onCancel={onCancel} t={t} />
        )}
        </>
      ))}
    </div>
  );
}

CommentsTree.propTypes = {
  commentId: PropTypes.string,
  data: PropTypes.array,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  onCommOpen: PropTypes.func,
  auth: PropTypes.bool,
  t: PropTypes.func,
};

export default memo(CommentsTree);
