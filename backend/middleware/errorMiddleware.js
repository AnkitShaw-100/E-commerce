// err → jo error throw hua wo object/message.
// req → request object.
// res → response object.
// next → next middleware ko call karne ka function.

// Agar response ka status code abhi bhi 200 (success) hai, lekin error aaya hai → to isse 500 (Internal Server Error) bana do.
// Agar pehle se koi aur status code set hai (jaise 400, 401, 404), to wahi use karo.
// Isse ensure hota hai ki error hone ke baad bhi tumhe galti se 200 OK na mile.

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({ message: err.message });
};

export default errorHandler;
