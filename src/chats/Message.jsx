import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { FaRegCheckCircle } from "react-icons/fa";
import { Avatar } from "@mui/material";
import MyAvatar from "../components/MyAvatar";

const Message = ({ message, currentfriend, scrollRef, typingMessage }) => {
  const { me } = useSelector(state => state.auth);
  return (
    <>
      <div className='message-show'>
        {message && message.length > 0 ? (
          message.map((m, index) =>
            m.senderId === me._id ? (
              <div ref={scrollRef} className='my-message'>
                <div className='image-message'>
                  <div className='my-text'>
                    <p className='message-text'>
                      {" "}
                      {m.message.text === "" ? (
                        <img src={m.message.image} alt='hello' />
                      ) : (
                        m.message.text
                      )}{" "}
                    </p>

                    {index === message.length - 1 && m.senderId === me._id ? (
                      m.status === "seen" ? (
                        currentfriend?.profilePhoto?.hasPhoto ? (
                          <Avatar
                            src={currentfriend.profilePhoto.url}
                            alt={currentfriend?.username}
                          />
                        ) : (
                          <MyAvatar />
                        )
                      ) : m.status === "delivared" ? (
                        <span>
                          {" "}
                          <FaRegCheckCircle />{" "}
                        </span>
                      ) : (
                        <span>
                          {" "}
                          <FaRegCheckCircle />{" "}
                        </span>
                      )
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className='time'>{moment(m.createdAt).startOf("mini").fromNow()}</div>
              </div>
            ) : (
              <div ref={scrollRef} className='fd-message'>
                <div className='image-message-time'>
                  {currentfriend?.profilePhoto?.hasPhoto ? (
                    <Avatar src={currentfriend.profilePhoto.url} alt={currentfriend?.username} />
                  ) : (
                    <MyAvatar />
                  )}
                  <div className='message-time'>
                    <div className='fd-text'>
                      <p className='message-text'>
                        {" "}
                        {m.message.text === "" ? (
                          <img src={m.message.image} alt='hello' />
                        ) : (
                          m.message.text
                        )}{" "}
                      </p>
                    </div>
                    <div className='time'>{moment(m.createdAt).startOf("mini").fromNow()}</div>
                  </div>
                </div>
              </div>
            )
          )
        ) : (
          <div className='friend_connect'>
            <img src={currentfriend.image} alt='' />
            <h3>{currentfriend.username} Connect You </h3>
            <span> {moment(currentfriend.createdAt).startOf("mini").fromNow()} </span>
          </div>
        )}
      </div>
      {typingMessage && typingMessage.msg && typingMessage.senderId === currentfriend._id ? (
        <div className='typing-message'>
          <div className='fd-message'>
            <div className='image-message-time'>
              {currentfriend?.profilePhoto?.hasPhoto ? (
                <Avatar src={currentfriend.profilePhoto.url} alt={currentfriend?.username} />
              ) : (
                <MyAvatar />
              )}
              <div className='message-time'>
                <div className='fd-text'>
                  <p className='time'>Typing Message.... </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Message;
