import React from 'react';
import Profile from '../../component/Profile';
import { useParams } from 'react-router-dom';

const ProfilePage = () => {
    const { username } = useParams();
    return (
        <div>
            <Profile username={username} />
        </div>
    );
};

export default ProfilePage;