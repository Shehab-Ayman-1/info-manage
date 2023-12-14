export const Searchbar = ({ setSearchText }) => {
   return (
      <div className="my-5 md:my-10">
         <div className="flex-between dark:border-sp mx-auto overflow-hidden rounded-xl px-4 py-2 shadow-sp dark:shadow-none">
            <i className="fa fa-search block text-2xl" />
            <input
               type="search"
               placeholder="البحث...."
               onChange={(e) => setSearchText(() => e.target.value)}
               className="w-full bg-transparent text-xl caret-primary md:p-1 md:pb-2 md:text-2xl"
            />
         </div>
      </div>
   );
};
