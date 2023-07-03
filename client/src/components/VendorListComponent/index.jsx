import Avatar from "../Avatar";

const VendorListComponent = () => {
  return (
    <div className="w-full p-4 bg-base-200 rounded-xl flex justify-between gap-2 items-center">
      <div>
        <Avatar bgColor="bg-secondary" initials="VB" />
      </div>
      <div>
        <div>
          <h5>Vishesh Bajpayee</h5>
          <p>
            @ <span className="text-gray-500">v_baj</span>
          </p>
        </div>
      </div>
      <div className="flex gap-4 ml-4">
        <div>2 orders</div>
        <span>$1213</span>
      </div>
    </div>
  );
};

export default VendorListComponent;
