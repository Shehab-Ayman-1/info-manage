export const Home = () => {
   return (
      <main className="home-section pt-6">
         <div className="flex-between shadow-sp m-auto w-[90%] max-w-2xl overflow-hidden rounded-full border-2 border-solid bg-white p-3">
            <i className="fa fa-search block text-2xl" />
            <input type="search" placeholder="البحث...." className="w-full bg-transparent p-1 pb-2 text-2xl" />
         </div>
      </main>
   );
};
