import React, { useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import CommentForm from '../../components/comment-form';
import UnauthComment from '../../components/unauth-comment';
import CommentsTree from '../../components/comments-tree';
import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';

function Comments({ data, onAddComment, auth, parentId, t, userName }) {
  const cn = bem('Comments');
  const [commentOn, setCommentOn] = useState('');
  const [showCommForm, setShowCommForm] = useState(true);

  const comments = listToTree([{ _id: parentId, parent: null }, ...data]);
  const listComments = treeToList(comments, (item, level) => ({ ...item, level })).slice(1);
  console.log('list', listComments);

  const callbacks = {
    onCancel: () => {
      setCommentOn('');
      setShowCommForm(true);
    },
    onAddComm: (text, parentId) => {
      onAddComment(text, parentId);
      setCommentOn('');
      setShowCommForm(true);
    },
    onOpen: id => {
      setCommentOn(id);
      setShowCommForm(false);
    },
  };

  return (
    <div className={cn()}>
      <CommentsTree
        comments={listComments}
        userName={userName}
        currentComment={commentOn}
        onCommOpen={callbacks.onOpen}
        onSubmit={callbacks.onAddComm}
        onCancel={callbacks.onCancel}
        auth={auth}
        t={t}
      />
      {/* {auth && showCommForm && (
        <CommentForm
          onSubmit={text => callbacks.onAddComm(text, parentId)}
          onCancel={callbacks.onCancel}
          isAnswer={true}
          t={t}
        />
      )}
      {!auth && showCommForm && <UnauthComment showButton={true} onCancel={callbacks.onCancel} t={t} />} */}
      {showCommForm &&
        (auth ? (
          <CommentForm
            onSubmit={text => callbacks.onAddComm(text, (parentId = null))}
            isAnswer={false}
            t={t}
          />
        ) : (
          <UnauthComment showButton={false} t={t} />
        ))}
    </div>
  );
}

export default Comments;
