import React, { useContext, useEffect, useState } from 'react'
import { BsChat } from "react-icons/bs"
import { FaRetweet } from "react-icons/fa"
import { AiOutlineHeart, AiOutlineShareAlt, AiFillHeart } from 'react-icons/ai'
import { RiDeleteBin5Line } from 'react-icons/ri'
import Moment from 'react-moment'

import { db } from "../firebase"
import { useRouter } from 'next/router'
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore'
import { useSession } from "next-auth/react"
import { AppContext } from '../contexts/AppContext'

const Post = ({ id, post }) => {
  const [likes, setLikes] = useState([])
  const [liked, setLiked] = useState(false)
  const [comments, setComments] = useState([])

  const { data: session } = useSession()
  const router = useRouter()
  const [appContext, setAppContext] = useContext(AppContext)

  useEffect(() => {
    const commentsRef = collection(db, "posts", id, "comments");
    const unsubscribeComments = onSnapshot(
      query(commentsRef, orderBy("timestamp", "desc")),
      (snapshot) => setComments(snapshot.docs)
    );
    return () => unsubscribeComments();
  }, [id]);

  useEffect(() => {
    const likesRef = collection(db, "posts", id, "likes");
    const unsubscribeLikes = onSnapshot(likesRef, (snapshot) => setLikes(snapshot.docs));
    return () => unsubscribeLikes();
  }, [id]);

  useEffect(() => {
    if (session?.user?.uid) {
      setLiked(likes.some((like) => like.id === session.user.uid));
    }
  }, [likes, session]);

  const likePost = async () => {
    try {
      if (liked) {
        await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
      } else {
        await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
          username: session.user.name,
        });
      }
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  const openModal = () => {
    setAppContext({
      ...appContext,
      isModalOpen: true,
      post,
      postId: id
    });
    console.log('opening modal', appContext.post);
  };

  const deletePost = async (e) => {
    e.stopPropagation();
    try {
      await deleteDoc(doc(db, "posts", id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className='mt-4 border-t border-gray-500 px-4 pt-6 pb-4 cursor-pointer' onClick={() => router.push(`/${id}`)}>
      <div className='grid grid-cols-[48px,1fr] gap-4'>
        <div>
          <img className='h-12 w-12 rounded-full object-cover' src={post?.userImg || '/default-avatar.png'} alt="" />
        </div>
        <div>
          <div className='block sm:flex gap-1'>
            <h1 className='font-medium'>{post?.username || 'Anonymous'}</h1>
            <div className='flex'>
              <p className='text-gray-500'>@{post?.tag || ''} &nbsp;·&nbsp;</p>
              <p className='text-gray-500'>
                <Moment fromNow>{post?.timestamp?.toDate() || new Date()}</Moment>
              </p>
            </div>
          </div>
          <p>{post?.text || ''}</p>
          <img
            className='max-h-[450px] object-cover rounded-[20px] mt-2'
            src={post?.image || '/default-image.png'}
            alt="" />
          <div className='flex justify-between text-[20px] mt-4 w-[80%]'>
            <div className='flex gap-1 items-center'>
              <BsChat className='hoverEffect w-7 h-7 p-1' onClick={(e) => {
                e.stopPropagation();
                openModal();
              }} />
              {comments.length > 0 && (<span className='text-sm'>{comments.length}</span>)}
            </div>
            {session.user.uid !== post?.id ? (
              <FaRetweet className='hoverEffect w-7 h-7 p-1' />
            ) : (
              <RiDeleteBin5Line className='hoverEffect w-7 h-7 p-1' onClick={deletePost} />
            )}
            <div className='flex gap-1 items-center' onClick={(e) => {
              e.stopPropagation();
              likePost();
            }}>
              {liked ? <AiFillHeart className='hoverEffect w-7 h-7 p-1 text-pink-700' />
                : <AiOutlineHeart className='hoverEffect w-7 h-7 p-1' />}
              {likes.length > 0 && (<span className={`${liked ? "text-pink-700" : ""} text-sm`}>{likes.length}</span>)}
            </div>
            <AiOutlineShareAlt className='hoverEffect w-7 h-7 p-1' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
