import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { DeleteProfile, ProfileInfo, UpdateProfile } from "@/components/profile";
import { Form } from "@/components/ui";
import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout/Loading";
import { ADMIN } from "@/constants/users";

export const Profile = () => {
   const [text] = useTranslation();
   const { data, setData, loading, error, isSubmitted, refetch } = useAxios();

   const { companyId, productId } = useParams();
   const { user } = useSelector(({ users }) => users);

   useEffect(() => {
      if (!companyId || !productId) return;
      (async () => await refetch("get", `/products/get-profile/${companyId}/${productId}`))();
   }, [companyId, productId]);

   if (!data) return <Loading isSubmitted={isSubmitted} loading={loading} error={error} />;

   return (
      <Form headerText={text("profile-title")}>
         <div className="w-full">
            <img
               src={data.img}
               alt="profile"
               className="object-cotain mx-auto block h-24 w-24 rounded-full shadow-sp md:h-32 md:w-32"
            />
         </div>

         <div className="flex-center mt-5 w-full !gap-6">
            {user?.role === ADMIN && <UpdateProfile setData={setData} />}
            {user?.role === ADMIN && <DeleteProfile setData={setData} />}
         </div>

         <ProfileInfo title={text("profile-name")} name={data.name} />

         <ProfileInfo title={text("profile-barcode")} name={data.barcode} />

         <ProfileInfo
            title={text("profile-suppliers")}
            name={data.suppliers.length ? data.suppliers.join(" | ") : "----"}
         />

         <div className="flex-between">
            <ProfileInfo
               title={text("profile-purchase-price")}
               name={`${data.price.buy} ${text("pound")}`}
               fullWidth
            />
            <ProfileInfo
               title={text("profile-sales-price")}
               name={`${data.price.sale} ${text("pound")}`}
               fullWidth
            />
         </div>

         <div className="flex-between">
            <ProfileInfo
               title={text("profile-store-count")}
               name={`${data.count.store} ${text("part")}`}
               fullWidth
            />
            <ProfileInfo
               title={text("profile-shop-count")}
               name={`${data.count.shop} ${text("part")}`}
               fullWidth
            />
         </div>
      </Form>
   );
};
