const multer = require('multer');
const CloudinaryStorage = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  // use credentials from .env
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const isProfile = req.originalUrl.includes('profile');
    return {
      folder: isProfile ? 'recipe-blog/profiles' : 'recipe-blog/recipes', // folder cloudinary
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp'], 
      // size helps save storage
      transformation: isProfile 
        ? [{ width: 400, height: 400, crop: 'fill', gravity: 'face' }]
        : [{ width: 800, crop: 'limit' }]
    };
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { 
    fileSize: 5 * 1024 * 1024,
    fieldSize: 10 * 1024 * 1024
  }
});

module.exports = upload;

/* const storage = multer.diskStorage({
    // we save files in disk
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../public/uploads'));
    },
    filename: (req, file, cb) => {
        // add date to avoid duplicates
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
      }
    });

    const fileFilter = (req, file, cb) => {
        // reject non-image file-types
        if (file.mimetype.startsWith('image/')) {
          cb(null, true);
        } else {
          cb(new Error('Only image files are allowed'), false);
        }
      };

      const upload = multer({
        // final upload, combines everything
        storage,
        fileFilter,
        limits: { fileSize: 5 * 1024 * 1024 }
      });

      // export for route files
      module.exports = upload; */