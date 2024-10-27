const asyncHandler = (requestHandler) => {
  return (req, res, next) => {   // 1. Handle the request asynchronously
    Promise.resolve(requestHandler(req, res, next))
    .catch((error) => {   // 2. Catch any error that occurs
      next(error);                                
    });
  };
};
 
export {asyncHandler}