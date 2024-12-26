import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  // Setting the filename for the uploaded files
  filename: function (req, file, cb) {
    // Generate a unique suffix using a combination of UUID and current timestamp
    const uniqueSuffix = `${uuidv4()}${Date.now()}`;

    // Get the original file extension (e.g., .jpg, .png) from the uploaded file's name
    const extension = path.extname(file.originalname);

    // Construct a unique filename using the unique suffix and original file extension
    const uniqueFileName = `${uniqueSuffix}${extension}`;

    // Pass the unique filename to the callback function to use as the stored filename
    cb(null, uniqueFileName);
  },
});
export const upload = multer({
  storage,
});
