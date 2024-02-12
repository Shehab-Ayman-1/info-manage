export const PageNotFound = () => {
   const src = "https://webpresence.digital/wp-content/uploads/2012/05/google-penguin-optimization.jpg";
   const className = "absolute left-1/2 top-1/2 mx-auto block -translate-x-1/2 -translate-y-1/2 object-contain";
   return (
      <div className="min-h-[calc(100vh-115px)]">
         <img src={src} alt="404 page" className={className} />
      </div>
   );
};
