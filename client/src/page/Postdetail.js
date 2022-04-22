import {
  Container,
  Box,
  Avatar,
  Typography,
  IconButton,
  Divider,
  TextField,
  Button,
} from "@material-ui/core";
import CommentIcon from "@material-ui/icons/Comment";
import ShareIcon from "@material-ui/icons/Share";
import SendIcon from "@material-ui/icons/Send";
import FavoriteIcon from "@material-ui/icons/Favorite";

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Comment from "../components/comment";
import axios from "axios";

function Postdetail() {
  const location = useLocation();
  const path = location.pathname.split("/");

  const p_id = path[path.length - 1];
  const [curPost, setCurPost] = useState(null);

  async function getOnePost(postId) {
    let result = await axios.get(
      `https://localhost:8080/posts?p_id=${postId}`,
      {
        withCredentials: true,
      }
    );
    // console.log(result.data);
    return result.data;
  }
  useEffect(() => {
    getOnePost(p_id).then(setCurPost);
    // console.log(curPost);
  }, []);

  useEffect(() => {
    console.log(curPost);
  }, [curPost]);

  return (
    <div className="Postdetail">
      <Container
        style={{
          width: "60%",
          padding: "1%",
          display: "flex",
        }}
      >
        {/* 흰 배경 박스 */}
        <Box
          style={{
            marginTop: "5%",
            borderRadius: "10px",
            backgroundColor: "white",
            width: "100%",
            padding: "1%",
          }}
        >
          <Box
            className="UserInfo"
            style={{
              display: "flex",
              padding: "1%",
              alignItems: "center",
            }}
          >
            <Avatar
              style={{
                backgroundColor: "orange",
                margin: "1%",
              }}
            >
              U
            </Avatar>
            <Box className="NameAndDate">
              <Typography variant="h5">
                {curPost ? curPost.post.author : ""}
              </Typography>
              <Typography
                variant="body2"
                style={{
                  color: "gray",
                }}
              >
                {curPost ? curPost.post.timestamp : ""}
              </Typography>
            </Box>
          </Box>
          <Box className="ContentArea">
            <Box
              className="Title"
              style={{
                marginLeft: "5%",
                marginRight: "5%",
              }}
            >
              <Typography variant="h5">
                {curPost ? curPost.post.title : ""}
              </Typography>
              <Typography variant="body1">
                {curPost ? curPost.post.content : ""}
              </Typography>
            </Box>
          </Box>
          <Box
            className="IconArea"
            style={{
              display: "flex",
              justifyContent: "right",
            }}
          >
            <Box className="CommentIconArea">
              <IconButton>
                <FavoriteIcon />
              </IconButton>
              <IconButton>
                <CommentIcon />
              </IconButton>
              <IconButton>
                <ShareIcon />
              </IconButton>
            </Box>
          </Box>
          <Divider variant="middle" />
          <Box
            className="CommentArea"
            style={{
              margin: "1%",
              borderRadius: "5px",
            }}
          >
            <Comment />
            <Comment />
          </Box>
          <Box
            className="CommentInputArea"
            style={{ padding: "2%", display: "flex", justifyContent: "right" }}
          >
            <TextField
              id="outlined-basic"
              label="Comment"
              variant="standard"
              maxRows={3}
              style={{
                width: "100%",
              }}
            />
            <IconButton>
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default Postdetail;
