import React, { useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import CommentForm from '../../components/comment-form';
import UnauthComment from '../../components/unauth-comment';
import CommentsTree from '../../components/comments-tree';
import listToTree from "../../utils/list-to-tree";
import treeToList from '../../utils/tree-to-list';

function Comments({ data, onAddComment, auth, parentId, t }) {
  const cn = bem('CommentTree');
  const [commentOn, setCommentOn] = useState(null);
  const [showCommForm, setShowCommForm] = useState(true);

  const comments = listToTree([{_id: parentId, parent: null}, ...data]);
  const listComments = treeToList(comments, (item, level) => ({...item, level})).slice(1);
  console.log('list', listComments);

  const callbacks = {
    onCancel: () => {
      setCommentOn(null);
      setShowCommForm(true);
    },
    onAddComm: (text, parentId) => {
      onAddComment(text, parentId);
      setCommentOn(null);
      setShowCommForm(true);
    },
    onOpen: id => {
      setCommentOn(id);
      setShowCommForm(false);
    },
  };

  return (
    <div className={cn()}>
      {!!listComments.length && listComments.map(parent => (
      <CommentsTree
        comment={parent}
        currentComment={commentOn}
        onCommOpen={callbacks.onOpen}
        onSubmit={callbacks.onAddComm}
        onCancel={callbacks.onCancel}
        auth={auth}
        t={t}
      />
     ))
    }
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
