import multer from "multer";

// Use memory storage to keep file buffer in RAM
const storage = multer.memoryStorage();

export const singleUpload = multer({ storage }).single("file");
