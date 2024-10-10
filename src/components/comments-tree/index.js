import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import CommentsItem from '../comments-item';
import UnauthComment from '../unauth-comment';
import CommentForm from '../comment-form';

function CommentsTree({ comment, currentComment, onCommOpen, onSubmit, onCancel, auth, t }) {
  const cn = bem('CommentTree');

    return (
      <div className={cn()}>
        <div key={comment._id} style={{ marginLeft: (comment.level - 1)* 30 }}>
        <CommentsItem comment={comment} onReply={id => onCommOpen(id)} t={t} />        
              {auth && currentComment===comment._id && (
                <CommentForm
                  onSubmit={text => onSubmit(text, comment._id)}
                  onCancel={onCancel}
                  placeholder={`${comment.author.profile.name}`}
                  isAnswer={true}
                  t={t}
                />
              )}
              {!auth && currentComment===comment._id && (
                <UnauthComment showButton={true} onCancel={onCancel} t={t} />
              )}
            </div>
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
