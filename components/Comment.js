import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for type checking
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { AiOutlineHeart, AiFillHeart, AiOutlineShareAlt } from "react-icons/ai";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { BsBarChart, BsTrash, BsChatDots } from "react-icons/bs";
import Moment from "react-moment";

const Comment = ({ comment }) => {
    // Fallback values for potentially undefined fields
    const userImg = comment?.userImg || '/default-avatar.png'; // Fallback image
    const username = comment?.username || 'Anonymous';
    const tag = comment?.tag || '';
    const timestamp = comment?.timestamp?.toDate() || new Date(); // Fallback to current date
    const commentText = comment?.comment || '';

    return (
        <div className="p-3 flex cursor-pointer border-b border-gray-700">
            <img
                src={userImg}
                alt="User Avatar"
                className="h-11 w-11 rounded-full mr-4"
            />
            <div className="flex flex-col space-y-2 w-full">
                <div className="flex justify-between">
                    <div className="text-[#6e767d]">
                        <div className="inline-block group">
                            <h4 className="font-bold text-[#d9d9d9] text-[15px] sm:text-base inline-block group-hover:underline">
                                {username}
                            </h4>
                            <span className="ml-1.5 text-sm sm:text-[15px]">
                                @{tag}
                            </span>
                        </div>
                        {" "}·{" "}
                        <span className="hover:underline text-sm sm:text-[15px]">
                            <Moment fromNow>{timestamp}</Moment>
                        </span>
                        <p className="text-[#d9d9d9] mt-0.5 max-w-lg text-[15px] sm:text-base">
                            {commentText}
                        </p>
                    </div>
                    <div className="icon group flex-shrink-0">
                        <BiDotsHorizontalRounded className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]" />
                    </div>
                </div>

                <div className="text-[#6e767d] flex justify-between w-10/12">
                    <div className="icon group">
                        <BsChatDots className="h-5 group-hover:text-[#1d9bf0]" />
                    </div>

                    <div className="flex items-center space-x-1 group">
                        <div className="icon group-hover:bg-pink-600/10">
                            <AiOutlineHeart className="h-5 group-hover:text-pink-600" />
                        </div>
                        <span className="group-hover:text-pink-600 text-sm"></span>
                    </div>

                    <div className="icon group">
                        <AiOutlineShareAlt className="h-5 group-hover:text-[#1d9bf0]" />
                    </div>
                    <div className="icon group">
                        <BsBarChart className="h-5 group-hover:text-[#1d9bf0]" />
                    </div>
                </div>
            </div>
        </div>
    );
};

// Define prop types for the component
Comment.propTypes = {
    comment: PropTypes.shape({
        userImg: PropTypes.string,
        username: PropTypes.string,
        tag: PropTypes.string,
        timestamp: PropTypes.instanceOf(Object), // Assuming timestamp is a Firestore Timestamp
        comment: PropTypes.string,
    }).isRequired,
};

export default Comment;
