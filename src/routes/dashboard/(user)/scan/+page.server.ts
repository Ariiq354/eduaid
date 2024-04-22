import type { PageServerLoad } from './$types';
import {v2 as cloudinary} from 'cloudinary';
import { VITE_PUBLIC_CLOUDINARY_CLOUD_NAME } from '$env/static/private';


export const load: PageServerLoad = async () => {
    cloudinary.config({ 
    cloud_name: "dszfasa7p", 
    api_key: '789787526647423', 
    api_secret: '4bkF-QbF9ehOogKHSE2NGbO-Xe8' 
    });
    

    const images = [
        './api-fast/2.jpg'
    ]

    const fetchImage = async () => {
        const res = await fetch('https://res.cloudinary.com/dszfasa7p/image/upload/v1713763745/test.jpg')
        return res
    }

    return {
        answerImage: fetchImage()
    }
};
