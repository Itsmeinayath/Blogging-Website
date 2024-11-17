import React, { useEffect, useState } from 'react';
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components';
import { login } from '../store/authSlice';
// import { Loader2 } from 'lucide-react';

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
            setLoading(false);
        }).catch((error) => {
            console.error("Failed to fetch posts:", error);
            setLoading(false);
        });
    }, []);

    // if (loading) {
    //     return (
    //         <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center">
    //             <div className="text-center">
    //                 <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto" />
    //                 <p className="mt-2 text-sm text-gray-600">Loading posts...</p>
    //             </div>
    //         </div>
    //     );
    // }

    if (posts.length === 0) {
        return (
            <div className="w-full min-h-screen bg-gray-50 py-16">
                <Container>
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            Welcome to Our Blog Platform
                        </h1>
                        <p className="text-lg text-gray-600 mb-8">
                            Join our community to start reading and sharing amazing stories
                        </p>
                        <button 
                            onClick={() => navigate('/login')}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                        >
                            Login to Read Posts 
                        </button>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-gray-50 py-12">
            <Container>
                <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                    Latest Posts
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {posts.map((post) => (
                        <div key={post.$id} className="transform hover:-translate-y-1 transition-transform duration-200">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;