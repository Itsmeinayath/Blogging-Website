import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug)
                .then((post) => {
                    if (post) setPost(post);
                    else navigate("/");
                })
                .catch((error) => {
                    console.error("Failed to fetch post:", error);
                    navigate("/");
                });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id)
            .then((status) => {
                if (status) {
                    appwriteService.deleteFile(post.featuredImage);
                    navigate("/");
                }
            })
            .catch((error) => {
                console.error("Failed to delete post:", error);
            });
    };

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <h1>{post.title}</h1>
            <div>{parse(post.content)}</div>
            {isAuthor && (
                <div>
                    <Button onClick={deletePost}>Delete Post</Button>
                    <Link to={`/edit/${post.$id}`}>
                        <Button>Edit Post</Button>
                    </Link>
                </div>
            )}
        </Container>
    );
}