import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export async function uploadCV(file: Buffer, userId: string): Promise<string> {
  try {
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'raw',
          folder: 'cvs',
          public_id: `${userId}-cv`,
          format: 'pdf',
          overwrite: true,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(file);
    });

    return (result as any).secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw new Error('Failed to upload CV');
  }
}

export async function deleteCV(userId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(`cvs/${userId}-cv`, { resource_type: 'raw' });
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
  }
}

export default cloudinary; 