import React, {useEffect, useState} from 'react'
import {Container, PostForm} from '../components'
import appwriteService from "../appwrite/config";
import { useNavigate,  useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        console.log('Slug:', slug);
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                console.log('Fetched Post:', post);
                if (post) {
                    setPosts(post);
                }
            }).catch(err => console.error('Error fetching post:', err));
        } else {
            navigate('/');
        }
    }, [slug, navigate]);
    const handleSubmit = async (updatedData) => {
        const result = await appwriteService.updatePost(slug, updatedData);
        console.log('Update Result:', result);
        if (result) navigate('/'); // Redirect after successful update
    };
    
    <PostForm post={post} onSubmit={handleSubmit} />;
        
  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
  
}

export default EditPost